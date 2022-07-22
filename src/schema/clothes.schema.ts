import { prop } from "@typegoose/typegoose";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Status } from "../utils/util";

registerEnumType(Status, {
    name: "Status",
    description: "different state of clothes"
})

@ObjectType()
export class Materials {
    @Field(() => String)
    name:string

    @Field(() => String)
    description:string

    @Field(() => Number)
    quantity:number

    @Field(() => Number)
    price: number
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
amount: number;

@Field(() => String)
@prop()
style_image: string;

@Field(() => String)
@prop()
material_image: string;

@Field(()=>Date)
@prop({default:new Date()})
start_date?:Date;

@Field(()=>Date)
@prop()
end_date?:Date;

@Field(()=>Number)
@prop()
interest:number;

@Field(()=>[Materials])
@prop()
materials:Materials[];

@Field(() => Status)
@prop()
status:string;
}