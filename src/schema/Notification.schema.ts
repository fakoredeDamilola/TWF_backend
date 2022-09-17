import { getModelForClass, isDocumentArray, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { NOTIFICATIONTYPE } from "../utils/util";

@ObjectType()
export class Notifications {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({ required: true, trim: true , type : String })
    title: string;

    @Field(() => String)
    @prop({ required: true, trim: true , type : String })
    message: string;

    @Field(() => String)
    @prop()
    clothID?: string;

    @Field(() => String)
    @prop()
    type?: string;

    @Field(() => String)
    @prop()
    from: string;

    @Field(() => String)
    @prop()
    to: string;
    
    @Field(() => String)
    @prop()
    tx_id?: string;

    @Field(() => Boolean)
    @prop({ required: true, default :false , type : Boolean })
    read_status: boolean;
  
    @Field()
    @prop({ default: () => Date.now()})
    createdAt: Date;
  
    @Field()
    @prop({ default: () => Date.now() })
    updatedAt: Date;

}

export const NotificationModel = getModelForClass(Notifications);