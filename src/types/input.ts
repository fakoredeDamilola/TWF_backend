import { Field, ID, InputType, registerEnumType } from "type-graphql";
import { Materials } from "../schema/clothes.schema";
import { Notifications } from "../schema/Notification.schema";
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

    @Field(()=>String)
    organization: string;

    @Field(() => Type)
    type: Type;

}

@InputType()
export class getNotificationInput {
    @Field(()=>Number)
    limit:number
}

@InputType()
export class MeasurementFrameInput {

    @Field(()=>String)
    id?:string;
    
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
export class startOrderInput{
    @Field(()=>String)
    clientID:string;

    @Field(()=>String)
    notificationID:string;

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

    @Field(() => String)
    phone?: string

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
    id?:string;

    @Field(()=>String)
    name:string;

    @Field(()=>String)
    description:string;

    @Field(()=>String)
    quantity:string;

    @Field(()=>String)
    price:string;
}



@InputType()
export class ClothesInput {
    @Field(()=>String)
    name:string

    @Field(()=>Number)
    amount?:number

    @Field(()=>String)
    style_image?:string

    @Field(()=>String)
    material_image?:string

    @Field(()=>String)
    description?:string

    @Field(()=>Number)
    interest?:number

    @Field(()=>Status)
    status:Status

    @Field(()=> [MaterialInput])
    materials?:MaterialInput[]

    @Field(()=>Date)
    start_date:Date

    @Field(()=>Date)
    end_date:Date

}

@InputType()
export class AddClientClothesInput {
    @Field(()=>String)
    client_id:string

   @Field(()=>ClothesInput)
   cloth :ClothesInput

}

@InputType()
export class AddClothesImageInput {
    @Field(()=>String)
    cloth_id:string

    @Field(()=>String)
    image:string
}
@InputType()
export class ParamsInput {
    @Field(()=>Number)
    itemPerPage?:number
    @Field(()=>Number)
    page?:number

    @Field(()=>String)
    search?: string

}
@InputType()
export class DeleteMaterialInput {
    @Field(()=>String)
    cloth_id?:string

    @Field(()=>String)
    name?:string

    @Field(()=>String)
    material_id:string
}

@InputType()
export class AddClothesMaterialInput {
    @Field(() => String)
    cloth_id:string

    @Field(()=>[MaterialInput])
    materials :MaterialInput[]
}


@InputType()
export class CartInput {
   @Field(()=> String)
   tailorID?:string

   @Field(()=>String)
   cartID?:string
}

@InputType()
export class NotificationPayload {
  @Field()
  status?: boolean;

  @Field(()=>Notifications)
  notification?: Notifications;

}


@InputType()
export class FetchUserInput {
   @Field(()=> String)
   name?:string

   @Field(()=>String)
   email?:string
}

@InputType()
export class storeClothesInput {
    @Field(()=>String)
    name:string
}

@InputType()
export class AddStoreClothesInput {
    @Field(()=>String)
    name:string

    @Field(()=>String)
    description:string

    @Field(()=>Boolean)
    draft:boolean

    @Field(()=>String)
    quantity:string

    @Field(()=>[String])
    sizeAvailable:string[]

    @Field(()=>String)
    clothURL:string

    @Field(()=>[String])
    sizes:string[]

    @Field(()=>[String])
    keyWords:string[]

    @Field(()=>String)
    price:string
}

@InputType()
export class ClothesPriceInput {
   @Field(()=> String)
   cloth_id:string

   @Field(()=>Number)
   amount:number
}


@InputType()
export class SearchParamsInput {
    @Field(()=> Status)
    status?:Status

    @Field(()=> String)
    name?:string

    @Field(()=> String)
    start_date?:string

}