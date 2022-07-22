import { Field, ID, InputType, registerEnumType } from "type-graphql";
import { Materials } from "../schema/clothes.schema";
import { Gender, Status, Type } from "../utils/util";

registerEnumType(Type,{
    name:"Type",
    description:"different kind of users that can sign up"
})

registerEnumType(Gender,{
    name:"Gender",
    description:"different kind of genders "
})



@InputType()
export class RegisterInput {
    @Field(()=>String)
    name: string;

    @Field(()=>String)
    email: string;

    @Field(()=>String)
    password: string;

    @Field(() => Type)
    type: Type;

}


@InputType()
export class MeasurementFrameInput {
    
    @Field(()=>String)
    name:string;

    @Field(()=>String)
    description:string;

    @Field(()=>String)
    value:string;
}


@InputType()
export class ClientMeasurementInput {


    @Field(()=>String)
    client_id:string

    @Field(()=>[MeasurementFrameInput])
    measurement:MeasurementFrameInput[]
}

@InputType()
export class ProfilePictureInput {
    @Field(()=>String)
    value:string;
}

@InputType()
export class ClientInput {

    @Field(()=>String)
    name:string

    @Field(() => Number)
    age?: number;

    @Field(() => String)
    address?: string;
  

    @Field(() => Gender)
    gender?: Gender

    @Field(() => String)
    measurement?: string

    @Field(() => String)
    image?: string

    @Field(()=>String)
    description?:string


}


@InputType()
export class LoginInput {
    @Field(()=>String)
    email: string;

    @Field(()=>String)
    password: string;
}

@InputType()
export class MaterialInput {
    @Field(()=>String)
    name:string;

    @Field(()=>String)
    description:string;

    @Field(()=>Number)
    quantity:number;

    @Field(()=>Number)
    price:number;
}



@InputType()
export class ClothesInput {
    @Field(()=>String)
    name:string

    @Field(()=>Number)
    amount:number

    @Field(()=>String)
    style_image:string

    @Field(()=>String)
    material_image:string

    @Field(()=>Number)
    interest:number

    @Field(()=>Status)
    status:Status

    @Field(()=> [MaterialInput])
    materials?:MaterialInput[]
}

@InputType()
export class AddClientClothesInput {
    @Field(()=>String)
    client_id:string

   @Field(()=>ClothesInput)
   cloth :ClothesInput

}

@InputType()
export class AddClothesMaterialInput {
    @Field(() => String)
    cloth_id:string

    @Field(()=>[MaterialInput])
    materials :MaterialInput[]
}