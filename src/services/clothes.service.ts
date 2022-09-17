import { clothesValidator } from "../config/Validation";
import { ClientModel } from "../schema/client.schema";
import { ClothesModel } from "../schema/clothes.schema";
import { UserModel } from "../schema/user.schema";
import IContext from "../types/context";
import {v4 as uuidv4} from "uuid"
import { AddClientClothesInput, AddClothesImageInput, AddClothesMaterialInput, ClothesPriceInput, DeleteMaterialInput, SearchParamsInput } from "../types/input";


export class ClothesService {
    async addClothes(input:AddClientClothesInput,context:IContext){
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
                
                let cloth = await ClothesModel.create({
                    ...input.cloth,
                    clientID:input.client_id,
                    clientName:findClient?.name,
                      materials:[]
                })
                await ClientModel.findOneAndUpdate(
                    {_id: input.client_id},
                    { $push: {
                        clothes:cloth
                    }
                }, {new:true}
                )
                  return { status:true,value:cloth }
              }
          }
  
        }catch(e) {
          console.log(e)
        }
    }

    async addClothesImage(input:AddClothesImageInput,context:IContext){
        try{
            const cloth = await ClothesModel.findOneAndUpdate(
                {_id:input.cloth_id},
                {$set:{style_image:input.image}},
                {new:true}
            )
            return {status:true,cloth}
        }catch(e){
            console.log(e)
        }
    }

    async addMaterialImage(input:AddClothesImageInput,context:IContext){
        try{
            const cloth = await ClothesModel.findOneAndUpdate(
                {_id:input.cloth_id},
                {$set:{material_image:input.image}},
                {new:true}
            )
            return {status:true,cloth}
        }catch(e){
            console.log(e)
        }
    }

    async deleteMaterial(input:DeleteMaterialInput, context:IContext) {
        try{
            if(context?.user){
                const cloth = await ClothesModel.findOneAndUpdate(
                    {_id:input.cloth_id},
                    {$pull:{"materials":{"name":input.name}}},
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

    



    async addClothesMaterial (input: AddClothesMaterialInput, context: IContext) {
       
        try{
            const materialInput = input.materials.map((item )=>{ return {
                ...item,
                 id:uuidv4()
            }})
            console.log({materialInput})

           const clothes = await ClothesModel.findOneAndUpdate(
                { _id : input.cloth_id},
                { $push : {
                    materials: {
                        $each : materialInput

                    }
                }
                },
                {new:true}
            )
            return {status:true,materials:clothes?.materials}

        }catch(e){

        }

    }

    async editClothesMaterial (input: AddClothesMaterialInput, context: IContext) {
        
        console.log({input},input.materials)
        try{

            const [inputVal] = input.materials
            const clothes = await ClothesModel.findOneAndUpdate(
                {_id:input.cloth_id,"materials.id":inputVal?.id},
                {
                    $set: {"materials.$": inputVal}
                },{new:true}
            )

            
            return {status:true,materials:clothes?.materials}

        }catch(e){

        }

    }

    async addTotalPrice(input:ClothesPriceInput) {
        try{
            const cloth =await ClothesModel.findOneAndUpdate({_id:input.cloth_id},{$set:{amount:input.amount}},{new:true})
            return {status:true,cloth}
        }catch(e){
           return {status:false,message:"error"}
        }
        
    }



    async getClientClothes(input:string) {
        try{
            const cloth = await ClothesModel.findById(input)
            console.log(cloth)
            return {cloth,status:true}
            
        }catch(e){
            return {status:false,message:"cloth not found"}
        }
    }

    async allClientsClothes(params:SearchParamsInput, context:IContext) {
        try{
            if(context?.user){
                // console.log({params})
            const query:any = {}
            if(params.name){ 
                query.name = params.name 
            }
            if(params.start_date){
                query.start_date = {"$gte" :Date.parse(params.start_date) }
            }
            if(params.status){
                 query.status = params.status 
            }
                 const clothes = await ClothesModel.find(query)
        return {clothes,status:true}
        }else {
                return {message:"No user found",status:false}
            }
       
        }
        // else{
            // return {message:"Not logged in",status:false}
        
        catch(e){
            console.log(e)
            return {status:false,message:"error"}
        }
    }

    async allClientClothes(input:string, context:IContext) {
        try{
                console.log(context.user,input)
            if(context?.user){
                const client = await ClientModel.findById(input).populate("clothes")
                if(client?.clothes){
                    console.log({client})
                    return {clothes: client?.clothes,status:true}
                }
                
            }else {
                return {message:"Not logged in",status:false}
            }
        }catch(e){
            return {status:false,message:"error"}
        }
    }

    
}