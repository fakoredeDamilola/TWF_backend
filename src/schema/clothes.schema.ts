import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Status } from "../utils/util";

registerEnumType(Status, {
    name: "Status",
    description: "different state of clothes"
})

@ObjectType()
export class Materials {
    @Field(()=> String)
    id:string
    
    @Field(() => String)
    name:string

    @Field(() => String)
    description:string

    @Field(() => String)
    quantity:string

    @Field(() => String)
    price: string
}



@ObjectType()
export class Clothes {
    @Field(() => String)
    _id: string;

@Field(() => String)
@prop({required:true})
name:string

@Field(() => Number)
@prop()
amount?: number;

@Field(() => Number)
@prop()
amountPaid?: number;

@Field(() => Number)
@prop()
amountRemaining?: number;

@Field(() => String)
@prop()
style_image?: string;

@Field(() => String)
@prop()
material_image?: string;

@Field(()=>Date)
@prop({default:new Date()})
start_date:Date;

@Field(()=>Date)
@prop()
end_date:Date;

@Field(()=>Number)
@prop()
interest?:number;

@Field(()=>String)
@prop()
description?:string;

@Field(()=>[Materials])
@prop()
materials?:Materials[];

@Field(()=>String)
@prop()
clientName?:string;

@Field(()=>String)
@prop()
clientID?:string;

@Field(() => Status)
@prop()
status:string;
}

export const ClothesModel = getModelForClass(Clothes);