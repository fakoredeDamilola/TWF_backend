import { createUnionType, Field, ObjectType } from "type-graphql"
import { MeasurementFrame } from "../schema/measurementFrame.schema";
import { GeneralErrorResponse } from "./generalResponse";




@ObjectType()
class MeasurementFrameSuccessResponse {
    @Field(()=>Boolean)
    status?:boolean

    @Field(()=> [MeasurementFrame])
    measurementFrame?:string

}



export const MeasurementFrameResponse = createUnionType({
    name:"MeasurementFrameResponse",
    types:() => [
        GeneralErrorResponse,
        MeasurementFrameSuccessResponse,
    ] as const,
    resolveType: (value) => {
        if('value' in value){
            return MeasurementFrameSuccessResponse
        }
        if('message' in value){
            return GeneralErrorResponse
        }
        return MeasurementFrameSuccessResponse
    }
})


@ObjectType()
class ProfilePictureSuccessResponse {
    @Field(() => Boolean)
    status?:boolean

    @Field(() => String)
    image?:string
}

export const ProfilePictureResponse = createUnionType({
    name:"ProfilePictureResponse",
    types:() => [
        GeneralErrorResponse,
        ProfilePictureSuccessResponse
    ] as const,
    resolveType: (value) => {
        if('image' in value){
            return ProfilePictureSuccessResponse
        }else {
            return GeneralErrorResponse
        }
    }
})