import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddNewClothInStoreResponse, getClothesInStoreResponse, getClothInStoreResponse } from "../Response/StoreResponse";
import { StoreService } from "../services/store.service";
import IContext from "../types/context";
import { AddStoreClothesInput, storeClothesInput } from "../types/input";


@Resolver()

export class StoreResolver {
    constructor(private storeService: StoreService) {
        this.storeService = new StoreService()
    }

    @Authorized() 
    @Mutation(()=>AddNewClothInStoreResponse)
    addClothesToStore(@Arg('input') input:AddStoreClothesInput, @Ctx() context:IContext){
        return this.storeService.addClothesToStore(input,context)
    }

    @Query(()=>getClothesInStoreResponse)
    getStoreClothes(@Arg('input') input:storeClothesInput, @Ctx() context:IContext){
        return this.storeService.getStoreClothes(input,context)
    }

    @Query(()=>getClothInStoreResponse)
    getStoreCloth(@Arg('input') input:string){
        return this.storeService.getStoreClothesById(input)
    }
}