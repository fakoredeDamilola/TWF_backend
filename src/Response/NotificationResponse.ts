import { createUnionType, Field, ObjectType } from "type-graphql"
import { Notifications } from "../schema/Notification.schema"
import { GeneralErrorResponse } from "./generalResponse"



@ObjectType()
export class getNotificationSuccessResponse {
@Field()
status:Boolean

@Field()
notifications:Notifications[]
}

// export const GetNotificationResponse = createUnionType({
//     name:'GetNotificationResponse',
//     types:() => [
//         GeneralErrorResponse,
//         ClientImageSuccessResponse
//     ] as const,
//     resolveType: (value) => {
//     if ('client' in value){
//         return ClientImageSuccessResponse
//     }
//     if ('message' in value){
//         return GeneralErrorResponse
//     }
//     return GeneralErrorResponse
//     }
//     })