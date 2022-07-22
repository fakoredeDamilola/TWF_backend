import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";



@ObjectType()
export class MeasurementFrame {
    @Field()
    @prop({ required: true })
    id: string;


    @Field(()=>String)
    @prop({required:true, trim:true})
    name:string;

    @Field(()=>String)
    @prop({required:true, trim:true})
    description:string;

    @Field(()=>String)
    @prop()
    value:string;
    

}

// export const MeasurementFrameModel = getModelForClass(MeasurementFrame)