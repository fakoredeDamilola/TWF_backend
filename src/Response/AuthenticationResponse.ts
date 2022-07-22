import { createUnionType, Field, ObjectType } from "type-graphql";
import { User } from "../schema/user.schema";


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