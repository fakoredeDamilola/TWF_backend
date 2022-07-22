import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { Type } from "../utils/util";
import { Client } from "./client.schema";
import { MeasurementFrame } from "./measurementFrame.schema";


type objectID = mongoose.Types.ObjectId;

@ObjectType()
export class User {
    @Field(() => String)
    _id: string;
  
    @Field(()=> String)
    @prop({required:true})
    password:string


    @Field(() => String)
    @prop({required:true, trim : true, unique:true})
    name: string;

    @Field(() => String)
    @prop({required:true, unique:true, trim : true})
    email: string;
  

    @Field(() => String)
    @prop({ required:true, trim : true, enum: Type })
    type: string

    @Field(() => [MeasurementFrame])
    @prop()
    measurementFrame: MeasurementFrame[]

    @Field(() => String)
    @prop()
    logoImage: string

    @Field(() => String)
    @prop()
    profileImage: string

    // @Field(() => [Client])
    // @prop({ ref: "Client", type: mongoose.Types.ObjectId  })
    // clients: Ref<[Client]>
    @Field(() => [Client])
    @prop({ ref: "Client", type: mongoose.Types.ObjectId  })
    clients: [objectID]

  }


export const UserModel = getModelForClass(User);
