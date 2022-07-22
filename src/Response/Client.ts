import { createUnionType, Field, ObjectType } from "type-graphql";
import { Client } from "../schema/client.schema";
import { Clothes, Materials } from "../schema/clothes.schema";
import { GeneralErrorResponse } from "./generalResponse";


@ObjectType()
class ClientSuccessResponse {
    @Field(() => Boolean)
    status?:boolean

    @Field(() => Client)
    client?:Client
}

@ObjectType()
class ClothesSuccessResponse {
    @Field(() => Boolean)
    status?:boolean

    @Field(() => Clothes)
    clothes?:Clothes

    @Field(()=>String)
    value?:string
}

@ObjectType()
class ClothesMaterialSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => [Materials])
    materials?:Materials[]
}

export const ClientResponse = createUnionType({
name:'ClientResponse',
types:() => [
    GeneralErrorResponse,
    ClientSuccessResponse
] as const,
resolveType: (value) => {
if ('client' in value){
    return ClientSuccessResponse
}
if ('message' in value){
    return GeneralErrorResponse
}
return GeneralErrorResponse
}
})


export const AddClientClothesResponse = createUnionType({
    name:"AddClientClothesResponse",
    types:() => [
        GeneralErrorResponse,
        ClothesSuccessResponse
    ] as const,
    resolveType: (value) => {
        if ('value' in value){
            return ClothesSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
        return GeneralErrorResponse
    }
})


export const AddClothesMaterialResponse = createUnionType({
    name:"AddClothesMaterialResponse",
    types: () => [
        GeneralErrorResponse,
        ClothesMaterialSuccessResponse
    ] as const,
    resolveType: (value) => {
        if("material" in value){
            return ClothesMaterialSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
    }
})