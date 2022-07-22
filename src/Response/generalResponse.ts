import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GeneralErrorResponse {
    @Field()
    status?: boolean;
  
    @Field()
    message ?: string;
}