import { createUnionType, Field, ObjectType } from "type-graphql"
import { Store } from "../schema/store.schema"
import { GeneralErrorResponse } from "./generalResponse"

@ObjectType()
class ClothSuccessResponse {
    @Field(()=>Boolean)
    status?:boolean

    @Field(()=>Store)
    store:Store
}

@ObjectType()
class getClothesSuccessResponse {
    @Field(()=>Boolean)
    status?:boolean

    @Field(()=>[Store])
    storeClothes:Store[]
}

@ObjectType()
class getClothSuccessResponse {
    @Field(()=>Boolean)
    status?:boolean

    @Field(()=>Store)
    storeClothes:Store
}

export const AddNewClothInStoreResponse = createUnionType({
    name:'AddNewClothInStoreResponse',
    types:() => [
        GeneralErrorResponse,
        ClothSuccessResponse
    ] as const,
    resolveType: (value) => {
    if ('store' in value){
        return ClothSuccessResponse
    }
    if ('message' in value){
        return GeneralErrorResponse
    }
    return GeneralErrorResponse
    }
})

export const getClothesInStoreResponse = createUnionType({
    name:"getClothesInStoreResponse",
    types:() => [
        GeneralErrorResponse,
        getClothesSuccessResponse
    ] as const,
    resolveType: (value) => {
    if ('storeClothes' in value){
        return getClothesSuccessResponse
    }
    if ('message' in value){
        return GeneralErrorResponse
    }
    return GeneralErrorResponse
    }
})
    
export const getClothInStoreResponse = createUnionType({
    name:"getClothInStoreResponse",
    types:() => [
        GeneralErrorResponse,
        getClothSuccessResponse
    ] as const,
    resolveType: (value) => {
    if ('storeClothes' in value){
        return getClothSuccessResponse
    }
    if ('message' in value){
        return GeneralErrorResponse
    }
    return GeneralErrorResponse
    }
})
    