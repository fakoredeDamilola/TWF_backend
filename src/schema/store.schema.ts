import { getModelForClass, isDocumentArray, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "./user.schema";

type objectID = mongoose.Types.ObjectId;

@ObjectType()
export class Store {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({required:true, trim : true})
    name: string;

    @Field(() => String)
    @prop()
    description: string;
  

    @Field(() => Boolean)
    @prop()
    draft: boolean;

    @Field(() => String)
    @prop()
    clothURL: string

    @Field(() => String)
    @prop()
    price?: string

    @Field(() => [String])
    @prop()
    otherImages?: string[]

    @Field(() => [String])
    @prop()
    sizeAvailable?: string[]

    @Field(() => String)
    @prop()
    quantity: string

    @Field(() => [String])
    @prop()
    sizes?: string[]

    @Field(() => [String])
    @prop()
    keyWords?: string[]

    @Field(()=> User)
    @prop({ required: true , type : mongoose.Types.ObjectId, ref : "User"  })
    user: objectID;

  }


export const StoreModel = getModelForClass(Store);
