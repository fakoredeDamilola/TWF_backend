import { createUnionType, Field, ObjectType } from "type-graphql";
import { Client } from "../schema/client.schema";
import { Clothes, Materials } from "../schema/clothes.schema";
import { MeasurementFrame } from "../schema/measurementFrame.schema";
import { Notifications } from "../schema/Notification.schema";
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
class ClientListSuccessResponse {
    @Field(() => Boolean)
    status?:boolean

    @Field(()=>Number)
    total?:number

    @Field(()=> [Client])
    clients:Client[]
}

@ObjectType()
class ClientClothSuccessResponse {
    @Field(() => Boolean)
    status?:boolean

    @Field(()=> Clothes)
    cloth:Clothes 
}

@ObjectType()
class ClothesMaterialSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => [Materials])
    materials?:Materials[]
}

@ObjectType()
class AllClientClothesSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => [Clothes])
    clothes:Clothes[]
}

@ObjectType()
class DeletedItemSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => String)
    value:string
}

@ObjectType()
class ClothesImageSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => Clothes)
    cloth?:Clothes
}
@ObjectType()
class ClientImageSuccessResponse {
    @Field(() => Boolean)
    status?:boolean
    
    @Field(() => Client)
    client?:Client
}

@ObjectType()
export class NotificationResponseSub {
  @Field(() => Boolean)
  status?: boolean;

//   @Field(()=>String)
  @Field(()=>Notifications)
  notification?: Notifications;

}

@ObjectType()
export class NotificationResponseSubArray {
  @Field()
  status?: boolean;

  @Field(()=>[Notifications])
  notifications?: Notifications[];

}

@ObjectType()
class ClientMeasurementSuccessResponse {
    @Field(()=>Boolean)
    status?:boolean

    @Field(() => [MeasurementFrame]) 
    measurement?:MeasurementFrame[]
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

export const AddClientImageResponse = createUnionType({
name:'AddClientImageResponse',
types:() => [
    GeneralErrorResponse,
    ClientImageSuccessResponse
] as const,
resolveType: (value) => {
if ('client' in value){
    return ClientImageSuccessResponse
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
        if("materials" in value){
            return ClothesMaterialSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
    }
})

export const AddClothesImageResponse = createUnionType({
    name:"AddClothesImageResponse",
    types: () => [
        GeneralErrorResponse,
        ClothesImageSuccessResponse
    ] as const,
    resolveType: (value) => {
        if('cloth' in value){
            return ClothesImageSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
    }
})
export const DeletedItemResponse = createUnionType({
    name:"DeletedItemResponse",
    types: () => [
        GeneralErrorResponse,
        DeletedItemSuccessResponse
    ] as const,
    resolveType: (value) => {
        if('value' in value){
            return DeletedItemSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
    }
})

export const ClientClothResponse = createUnionType({
    name:"ClientClothResponse",
    types: () => [
        GeneralErrorResponse,
        ClientClothSuccessResponse
    ] as const,
    resolveType: (value) => {
        if("cloth" in value){
            return ClientClothSuccessResponse
        }
        if("message" in value){
            return GeneralErrorResponse
        }
    }
})


export const ClientListResponse = createUnionType({
    name:"ClientListResponse",
    types: ()=>[
        GeneralErrorResponse,
        ClientListSuccessResponse
    ] as const,
    resolveType: (value) => {
        if("clients" in value){
            return ClientListSuccessResponse
        }
        if("message" in value){
            return GeneralErrorResponse
        }
        return GeneralErrorResponse
    }
})

export const ClientMeasurementResult = createUnionType({
    name:"ClientMeasurementResponse",
    types:() => [
        GeneralErrorResponse,
        ClientMeasurementSuccessResponse
    ] as const,
    resolveType: (value) => {
        if("measurement" in value){
            return ClientMeasurementSuccessResponse
        }
        if("message" in value){
            return GeneralErrorResponse
        }
        return GeneralErrorResponse
    }
})


export const NotificationResponse = createUnionType({
    name: 'NotificationResponse', // the name of the GraphQL union
    types: () =>
      [
        GeneralErrorResponse,
        NotificationResponseSub,NotificationResponseSubArray
        
      ] as const, // function that returns tuple of object types classes
    resolveType: (value) => {
      if ('notification' in value) {
        return NotificationResponseSub;
      }
      if ('notifications' in value) {
        return NotificationResponseSubArray;
      }
      if ('message' in value) {
        return GeneralErrorResponse;
      }
      return GeneralErrorResponse
    },
  });

export const AllClientClothes = createUnionType({
    name:"AllClientClothes",
    types:() => [
        GeneralErrorResponse,
        AllClientClothesSuccessResponse
    ] as const,
    resolveType: (value) => {
        if("clothes" in value){
            return AllClientClothesSuccessResponse
        }
        if("message" in value){
            return GeneralErrorResponse
        }
        return GeneralErrorResponse
    }
})