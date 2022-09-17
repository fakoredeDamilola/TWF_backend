import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectID } from "typeorm";
import { Store } from "./store.schema";

@ObjectType()
export class Transaction {
    @Field(() => String)
    _id: string;

    @Field(()=> [Store])
    @prop({ required: true , type : mongoose.Types.ObjectId, ref : "Transaction"  })
    clothID?: ObjectID;

    @Field(() => String)
    @prop({ required: true })
    tailor: string;

    @Field(() => String)
    @prop({ required: true })
    client: string;

    @Field(() => String)
    @prop({ required: true })
    quantity: string;
}


export const TransactionModel = getModelForClass(Transaction);