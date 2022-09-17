import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { OneToMany } from "typeorm";
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

    @Field(()=>String)
    @prop()
    description:string

    @Field(()=>String)
    @prop()
    phone:string

    // @Field(() => [Clothes])
    // @prop()
    // clothes: Clothes[];

    @Field((_type) => [Clothes])
    @prop({ ref: "Clothes", type: Clothes  })
    // @ts-ignore type unused
    @OneToMany(type => Clothes, action => action.id)
    clothes?: Clothes[];

  }


export const ClientModel = getModelForClass(Client);
