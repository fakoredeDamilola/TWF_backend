import { clothesValidator, materialValidator, measurementValidator } from "../config/Validation"
import { Client, ClientModel } from "../schema/client.schema"
import { UserModel } from "../schema/user.schema"
import IContext from "../types/context"
import {v4 as uuidv4} from "uuid"
import { AddClientClothesInput, AddClothesMaterialInput, ClientInput, ClientMeasurementInput, MaterialInput, MeasurementFrameInput } from "../types/input"
import { Clothes, Materials } from "../schema/clothes.schema"

export class ClientService {
    async addClient(input:ClientInput,context:IContext) {
        try {

            const client = await ClientModel.create({
                ...input
            })
            await UserModel.findOneAndUpdate(
                { _id: context.user?._id },
                { $push: {
                    clients: client?._id
                }
            }, {new:true}
            )
            let returnData = {client}
            console.log(returnData)
            return returnData
        }catch(e) {
            console.log(e)
        }
    }

    async addMeasurement(input:ClientMeasurementInput ,context:IContext) {
        try{

            let user = context.user
           let validation = input.measurement.map((item: MeasurementFrameInput)=>measurementValidator(item))
           .find((item)=>!item.status)

           if(validation){
            return validation
           }

           const userData = await UserModel.findById(user?._id).populate("clients")

           const findClient = userData?.clients.find((item)=>item._id.toString() ===input.client_id)

           if(!findClient){
            return {
                status:false,
                message:"This customer is not on your database"
            }
           }else {
       
        let measurementInput = input.measurement.map(item =>{ return {
            ...item,
            id:uuidv4()
        }})
        const measurement = await ClientModel.findOneAndUpdate(
            {_id:input.client_id},
            {
                $push : {
                    measurement: {
                        $each : measurementInput
                    }
                }
            }
        )
        return {status:true,result:measurement?.measurement}
           }

        } catch(e){
            console.log(e)
        }
    }

    async addClothes(input:AddClientClothesInput,context:IContext) {
        const ObjectID = require('mongodb').ObjectID;
      try {
        let user = context.user
        let validation =  clothesValidator(input.cloth)
        if(!validation){
            return validation
        }else{

            const userData = await UserModel.findById(user?._id).populate("clients")

            const findClient = userData?.clients.find((item)=>item._id.toString() ===input.client_id)
            if(!findClient){
                return {
                    status:false,
                    message:"This customer is not on your database"
                }
            }else {

               let cloth = await ClientModel.findOneAndUpdate(
                    {_id: input.client_id},
                    { $push : {
                        clothes:  {
                            _id: new ObjectID(),
                              ...input.cloth,
                              materials:[]
                        }
                    }

                    }

                )
                return { status:true,value:"Cloth added" }
            }
        }

      }catch(e) {
        console.log(e)
      }
    }

    async addClothesMaterial (input: AddClothesMaterialInput, context: IContext) {
        try{
            let user = context?.user
            const userData = await UserModel.findById(user?._id).populate({path:"clients",model:Client})
            console.log(userData)
            // const findCloth = userData?.clients?.clothes.find((item:Clothes)=> item?._id?.toString() === input.cloth_id)
            // userData?.clients?.clothes.forEach((item:Clothes)=> console.log(item?._id?.toString()))
            // console.log({findCloth})

        }catch(e){

        }
    }
}