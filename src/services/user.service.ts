import { registerValidator } from "../config/Validation";
import { RegisterInput,MeasurementFrameInput, ProfilePictureInput, ClientInput, LoginInput } from "../types/input";
import bycrypt from "bcrypt"
import { UserModel } from "../schema/user.schema";
import { generateToken } from "../utils";
import {v4 as uuidv4} from "uuid"
import IContext from "../types/context";

export class UserService {

    async register(input:RegisterInput) {
        try {

            const saltRounds = 10
            const {name, email, password, type} = input

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
                }
            }
            

        }catch(e){
            console.log(e)
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

}