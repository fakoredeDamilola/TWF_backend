import { getModelForClass, isDocumentArray, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { Type } from "../utils/util";
import { Client } from "./client.schema";
import { MeasurementFrame } from "./measurementFrame.schema";
import {OneToMany} from "typeorm";
import { Store } from "./store.schema";

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
    @prop({unique:true, trim : true})
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

    @Field(() => String)
    @prop()
    organization: string

    // @Field(()=>[Notification])
    // @prop({ ref: "Notification", type: Notification  })
    // // @ts-ignore type unused
    // @OneToMany(type => Notification, action => action.id)
    // notifications?: Notification[];

   @Field(()=> [Store])
    @prop({ required: true , type : mongoose.Types.ObjectId, ref : "User"  })
    cart?: objectID[];
    
    @Field((_type) => [Client])
    @prop({ ref: "Client", type: Client  })
    // @ts-ignore type unused
    @OneToMany(type => Client, action => action.id)
    clients?: Client[];
    // public areAllClients(): boolean {
    //   if (isDocumentArray(this.clients)) {
    //     // "this.kittens" now has the type of "Cat"
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    // @Field(()=> [Client])
    // @prop({ required: true , type : mongoose.Types.ObjectId, ref : "User"  })
    // clients?: objectID[];

  }


export const UserModel = getModelForClass(User);
