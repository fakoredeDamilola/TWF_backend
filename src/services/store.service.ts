import { StoreModel } from "../schema/store.schema"
import IContext from "../types/context"
import { AddStoreClothesInput, storeClothesInput } from "../types/input"


export class StoreService {
    async addClothesToStore(input:AddStoreClothesInput,context:IContext){
        try{
            console.log({input})
            const store = await StoreModel.create({
                ...input,
                user:context.user?._id
                // draft:input.type===STOREstore.DRAFT ? true:false
            })
            return {status:true,store}
        }catch(e){
            return {status:false,message:"error"}
        }
    }

    async getStoreClothes(input:storeClothesInput,context:IContext){
        try{
            console.log({input})
            const storeClothes = await StoreModel.find()
            console.log({storeClothes})
            return { status:true, storeClothes }
        }catch(e){
            return { status:false,message:"error" }
        }
    }
    async getStoreClothesById(id:string){
        try{
            const storeClothes = await StoreModel.findById(id).populate("user", "name email _id organization")
            console.log({storeClothes})
            return { status:true, storeClothes }
        }catch(e){
            return { status:false,message:"error" }
        }
    }
    
}