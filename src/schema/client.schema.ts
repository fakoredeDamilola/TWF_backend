import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Gender } from "../utils/util";
import { Clothes } from "./clothes.schema";
import { MeasurementFrame } from "./measurementFrame.schema";


@ObjectType()
export class Client {
    @Field(() => String)
    _id: string;
  
    @Field(()=> String)
    @prop({required:true})
    name:string


    @Field(() => Number)
    @prop()
    age: number;

    @Field(() => String)
    @prop()
    address: string;
  

    @Field(() => String)
    @prop({enum: Gender })
    gender: string

    @Field(() => [MeasurementFrame])
    @prop()
    measurement: MeasurementFrame[]

    @Field(() => String)
    @prop()
    image: string

    // @Field(() => String)
    // @prop()
    // totalClothes: string

    // @Field(() => String)
    // @prop()
    // clothesCompleted: string;


    // @Field(() => String)
    // @prop()
    // totalAmountPaid: string;

    // @Field(() => String)
    // @prop()
    // balanceAmount: string;
    @Field(()=>String)
    @prop()
    description:string

    @Field(() => [Clothes])
    @prop()
    clothes: Clothes[];

  }


export const ClientModel = getModelForClass(Client);
