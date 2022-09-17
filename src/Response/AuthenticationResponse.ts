import { createUnionType, Field, ObjectType } from "type-graphql";
import { User } from "../schema/user.schema";
import { UserAvgDataMonthly } from "../schema/userAvgDataMonthly.schema";
import { GeneralErrorResponse } from "./generalResponse";


@ObjectType()
export class RegisterFailResponse {
    @Field(() => String)
    message: string;

    @Field(() => String)
    field?:string

    @Field(() => Boolean)
    status?:boolean
}

@ObjectType()
export class RegisterSuccessResponse {
@Field(()=>Boolean)
status?:boolean

@Field(() => User)
user?:User

@Field(() =>String)
token?:string
}

@ObjectType()
export class VerifyRecordSuccess {
  @Field(()=>Boolean)
  status?: boolean;

  @Field(() =>String)
  message?: string;
}

@ObjectType()
export class UserSuccessResponse {
  @Field(() => Boolean)
  status?:boolean

  @Field(() => User)
  user?:User
}

@ObjectType()
class UserSuccessDataMonthlyResponse {
  @Field(()=>UserAvgDataMonthly)
  userAvgDataMonthly?:UserAvgDataMonthly

  @Field(()=>Boolean)
  status?:boolean
}

@ObjectType()
class AddItemToCartSuccessResponse {
  @Field(()=>Boolean)
  status?:boolean

  @Field(()=>String)
  data?:string
}

export const AuthenticationResponse = createUnionType({
    name:"AuthenticationResponse",
    types:() => [
        RegisterFailResponse,
        RegisterSuccessResponse,
        VerifyRecordSuccess
    ] as const,
    resolveType: (value) => {
        console.log(value)
        if ('field' in value) {
          return RegisterFailResponse;
        }
        if ('user' in value) {
          return RegisterSuccessResponse;
        }
        if ('message' in value) {
          return VerifyRecordSuccess;
        }
        return RegisterFailResponse
      },
})


export const UserResponse = createUnionType({
  name:"UserResponse",
  types: () => [
    GeneralErrorResponse,
    UserSuccessResponse
  ] as const,
  resolveType: (value) => {
    if('user' in value){
      return UserSuccessResponse
    }
    if('message' in value){
      return GeneralErrorResponse
    }
    return GeneralErrorResponse
  }
})

export const userDataMonthlyResponse = createUnionType({
  name:"userDataMonthlyResponse",
  types: () => [
    UserSuccessDataMonthlyResponse,
    GeneralErrorResponse
  ] as const,
  resolveType: (value) => {
    if("userAvgDataMonthly" in value) {
      return UserSuccessDataMonthlyResponse
    }
    if("message" in value){
      return GeneralErrorResponse
    }

  }
})
export const AddItemToCartResponse = createUnionType({
  name:"AddItemToCartResponse",
  types: () => [
    AddItemToCartSuccessResponse,
    GeneralErrorResponse
  ] as const,
  resolveType: (value) => {
    if("data" in value) {
      return AddItemToCartSuccessResponse
    }
    if("message" in value){
      return GeneralErrorResponse
    }

  }
})