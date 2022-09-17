import { clothesValidator, materialValidator, measurementValidator } from "../config/Validation"
import { ClientModel } from "../schema/client.schema"
import { User, UserModel } from "../schema/user.schema"
import IContext from "../types/context"
import {v4 as uuidv4} from "uuid"
import mongoose from "mongoose";
import { AddClientClothesInput, AddClothesImageInput, AddClothesMaterialInput, ClientInput, ClientMeasurementInput, DeleteMaterialInput, MaterialInput, MeasurementFrameInput, ParamsInput } from "../types/input"


export class ClientService {
    async addClient(input:ClientInput,context:IContext) {
        try {

            const client = await ClientModel.create({
                ...input
            })
            await UserModel.findOneAndUpdate(
                { _id: context.user?._id },
                { $push: {
                    clients: client
                }
            }, {new:true}
            )

            let returnData = {client,status:true}
            console.log({returnData})
            return returnData
        }catch(e) {
            return {message:"not logged in",status:false}
        }
    }

    async addMeasurement(input:ClientMeasurementInput ,context:IContext) {
        try{

           let validation = input.measurement.map((item: MeasurementFrameInput)=>measurementValidator(item))
           .find((item)=>!item.status)

           if(validation){
            return validation
           }
        let measurementInput = input.measurement.map(item =>{ return {
            ...item,
            id:uuidv4()
        }})
        const measurement = await ClientModel.findOneAndUpdate(
            {_id:input.client_id},
            {
                $addToSet : {
                    measurement: {
                        $each : measurementInput
                    }
                }
            },{new:true}
        )
        // return {status:true,value:"Measurement added"}
        return {status:true,value:measurement?.measurement}

        } catch(e){
            console.log(e)
            return {status:false,message:"no client found"}
        }
    }

    async editMeasurement(input:ClientMeasurementInput ,context:IContext) {
        try{

           let validation = input.measurement.map((item: MeasurementFrameInput)=>measurementValidator(item))
           .find((item)=>!item.status)

           if(validation){
            return validation
           }
           const [inputVal] = input.measurement
           console.log({inputVal})
        const measurement = await ClientModel.findOneAndUpdate(
            {_id:input.client_id,"measurement.id":inputVal?.id},
            {
                $set: {"measurement.$": inputVal}
            },{new:true}
        )
        // return {status:true,value:"Measurement added"}
        return {status:true,value:measurement?.measurement}

        } catch(e){
            console.log(e)
            return {status:false,message:"no client found"}
        }
    }


    async deleteMeasurement(input:DeleteMaterialInput, context:IContext) {
        console.log({input}) // cloth id ==== client id
        try{
            if(context?.user){
                const client = await ClientModel.findOneAndUpdate(
                    {_id:input.cloth_id},
                    {$pull:{"measurement":{"id":input.material_id}}},
                    {new:true}
                )
                return {value:"deleted successfully",status:true}
            }else {
                return {message:"Not logged in",status:false}
            }
        }catch(e){
            return {status:false,message:"error"}
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

            const findClient = userData?.clients && userData?.clients.find((item)=>item._id.toString() ===input.client_id)
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

                    }, {new:true}

                )
                return { status:true,clothes:cloth?.clothes }
            }
        }

      }catch(e) {
        console.log(e)
      }
    }

    async addClientImage(input:AddClothesImageInput,context:IContext){
        try{
            const client = await ClientModel.findOneAndUpdate(
                {_id:input.cloth_id},
                {$set:{image:input.image}},
                {new:true}
            )
            return {status:true,client}
        }catch(e){
            console.log(e)
        }
    }

    async clientList(params:ParamsInput,context:IContext) {
        try{
    let query:any = {}
            console.log({params})
   
    if(params?.itemPerPage){
        query.itemPerPage = params?.itemPerPage
    }
    if(params?.page){
        query.page = params?.page
    }

    const record = query.itemPerPage ? query.itemPerPage : 20;
      const page = query.page ? query.page : 1;
      const prev_page: number = page > 0 ? page - 1 : 0;
      let skip: number = record * prev_page;
      console.log({skip,record},query.search)
        let total = await UserModel.findById(context.user?._id)

            const user =await UserModel.findById(context.user?._id).populate({
                path:"clients",
                options: {
                    limit: record,
                    sort: {  createdAt: 'desc'  },
                    skip,
                    // "name": { "$regex": query.search, "$options": "i" }
                    match: { "name": { "$regex": "Dayo", "$options": "i" } }
                 }
        })
        if(params?.search){
            query.search = params?.search
        }
            return {clients:user?.clients, status:true,total:total?.clients?.length}
        }catch(e){
            console.log(e)
            return {message:"an error occurred",status:false}
        }
    }

    async getClient(input:string,context:IContext) {
        try {
            if(context.user?._id){
                const client = await ClientModel.findById(input)
                return {client,status:true}
            }
        }catch(e){
            return {message:"an error occurred",status:false}
        }
    }

    async clientMeasurement(input: string) {
        try{
            const client = await ClientModel.findById(input)
            if(client){
            return {measurement:client?.measurement,status:true}
            }else{
                return {status:false,message:"error"} 
            }
            
        }catch(e){
            return {status:false,message:"error"}
        }
    }
}