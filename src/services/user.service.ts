import { registerValidator } from "../config/Validation";
import { RegisterInput,MeasurementFrameInput, ProfilePictureInput, ClientInput, LoginInput, FetchUserInput, CartInput, NotificationPayload } from "../types/input";
import bycrypt from "bcrypt"
import { UserModel } from "../schema/user.schema";
import { generateToken } from "../utils";
import {v4 as uuidv4} from "uuid"
import IContext from "../types/context";
import { NOTIFICATIONTYPE, Type } from "../utils/util";
import { PubSubEngine } from 'graphql-subscriptions';
import mongoose from "mongoose";
import { NotificationModel } from "../schema/Notification.schema";

export class UserService {

    async register(input:RegisterInput) {
        try {

            const saltRounds = 10
            const {name, email, password, type, organization} = input
           
            if(input.type === Type.GUEST){
                let user = await UserModel.create({
                    name:"guest",
                    password:"123456789",
                    type
                })

                const returnData ={
                    user, 
                    token: generateToken({
                        name,
                        email,
                        type,
                        _id:user._id
                    })
                }

               return returnData
                
            } else {
               const isValidated = registerValidator(input)
            let hash =await bycrypt.hash(password,saltRounds)
            if(!isValidated.status){
                return isValidated
            }else{
                let user = await UserModel.findOne({email}).lean()
                
                if(user){

                    return {
                        status:false,
                        message:"Email already exists",
                        field:"email"
                    }
                }else{
                    
               let user = await UserModel.create({
                    name,
                    email,
                    password:hash,
                    type,
                    organization
                })

                const returnData ={
                    user, 
                    token: generateToken({
                        name,
                        email,
                        type,
                        _id:user._id
                    })
                }

               return returnData
                }
            } 
            }
            
            

        }catch(e){
            console.log(e)
        }
    }

    async getUserData(context:IContext){
        try{
            let userObject ={
                clients:0,
                clothes:0,
                completedClothes:0,
                clothesInProgress:0,
                clothesToDo:0
            }
            console.log(context.user)
            let user = await UserModel.findOne({email: context?.user?.email})
            .populate("clients")

            // get all clients
            if(user){
                userObject.clients = user?.clients? user?.clients.length :0
                const clothes = []
                const completedClothes = []
                user?.clients?.forEach(client => {
                    console.log(client.clothes)
                    clothes.push(client.clothes)
                    // if(client)
                }
                )
                userObject.clothes = clothes.length

            }



            return {status:true,userAvgDataMonthly:userObject}
        }catch(e:any){
            return {status: false, message:e.message}
        }
    }

    async login(input: LoginInput) {
        try {
            const { email, password } = input
            const user = await UserModel.findOne({ email }).lean()
            if (!user) {
                return {
                    status: false,
                    message: "Email not found",
                    field: "email"
                }
            }
            const isValid = await bycrypt.compare(password, user.password)
            if (!isValid) {
                return {
                    status: false,
                    message: "Password is incorrect",
                    field: "password"
                }
            }
            const returnData = {
                user,
                token: generateToken({
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    _id: user._id
                })
            }
            return returnData
        } catch (e) {
            console.log(e)
        }
    }

    async addMeasurementFrame(input: MeasurementFrameInput,context:IContext) {
        try {
            let inputItem = {
                ...input,
                id:uuidv4()
            }
            console.log(inputItem)
            const doc = await UserModel.findOneAndUpdate(
                { _id: context.user?._id },
                { $push: { 
                    measurementFrame:inputItem
            } 
        }, {new:true}
              );
              return doc
        }catch(e){
            console.log(e)
        }
    }

    async addProfilePicture(params:ProfilePictureInput,context:IContext) {
        try{
            await UserModel.findOneAndUpdate(
                { _id: context.user?._id },
                {profileImage:params.value} 
            )
        }catch(e){
            console.log(e)
        }
    }

    async fetchUserByDetails(input:FetchUserInput){
     if(!input.name && !input.email){
        return {status:false,message:"you cannot query empty data"}
     } else{
        let user = await UserModel.findOne({name: input.name }).select(["-password","-measurementFrame","-clients"])
        if(user){
            console.log({user})
            return {status:true, user }
        }else{
            return {status: false, message:"no user found"}
        }
     }
    }

    async fetchLoggedInUser(context:IContext){
        try{
            let user = await UserModel.findOne({name: context?.user?.name })
            return {status:true,user}
        }catch(e:any){
            return {status: false, message:e.message}
        }
    }

    async addItemToCart(input:CartInput,context:IContext, pubSub:PubSubEngine){
        try{
            console.log({input})
            await UserModel.findOneAndUpdate(
                { _id: context.user?._id },
                { $push: { 
                    cart:new mongoose.Types.ObjectId(input.cartID)
            } 
        }, {new:true}
              );

            // register notification
            const notification = await NotificationModel.create({
                from:context?.user?._id,
                to:input.tailorID,
                type:NOTIFICATIONTYPE.CART_REQUEST,
                message:"Someone ordered a new item from you",
                title:"New Order",
                clothID:input.cartID,
                read_status:false
            })

            const payload: NotificationPayload = { status: true, notification };
            await pubSub.publish('NOTIFICATIONS', payload);          
              return {status:true,data:"successfully added item to cart"}
        }catch(e){
            return {status:false,message:"failed to add item"}
        }
    }

}