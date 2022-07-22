
import {  ClothesInput, MaterialInput, MeasurementFrameInput, RegisterInput } from "../types/input";
import { Validator } from "../validation";

export const registerValidator = (input:RegisterInput) =>{
    
    const validator = new Validator()

    const { name,email,password,type } = input

    const names = validator
                .notEmpty()
                .min(5)
                .max(30)
                .validate(name, "name")

    const emails = validator
                    .notEmpty()
                    .min(3)
                    .max(70)
                    .validate(email,"email")

    const passwords = validator
                        .notEmpty()
                        .min(8)
                        .containLowercase()
                        .containUppercase()
                        .containDigit()
                        .validate(password,"password")
    // const types = validator
    //                 .notEmpty()
    //                 .validate(type,"type")

        if(!names.status) return names;
        if(!passwords.status) return passwords;
        if(!emails.status) return emails
        // if(!types.status) return types

        return {
            status: true,
            message: 'No error found',
          };
}


export const measurementValidator = (input:MeasurementFrameInput) => {
    const validator = new Validator()

    const {name,description,value} = input

    const names = validator.
                    notEmpty()
                    .min(2)
                    .max(30)
                    .validate(name,"name")

    const descriptions = validator
                            .min(5)
                            .validate(description,"description")

    const values = validator
                    .notEmpty()
                    .validate(value,"value")

                    if(!names.status) return names
                    if(!descriptions.status) return descriptions
                    if(!values.status) return values

                    
                    return {
                        status: true,
                        message: 'No error found',
                      };

}


export const materialValidator = (input:MaterialInput) => {
const validator = new Validator()
const {name,description,quantity,price} = input

    const names = validator
                    .notEmpty()
                    .min(2)
                    .max(30)
                    .validate(name,"name")
    
    const descriptions = validator
                        .min(2)
                        .max(30)
                        .validate(description,"description")
    
    const quantities = validator
                        .notEmpty()
                        .validate(quantity,"quantity")

        if(!names.status) return names
        if(!descriptions.status) return descriptions
        if(!quantities.status) return quantities

        return {
            status:true,
            message:"no Error Found"
        }

                        
} 

export const clothesValidator = (input: ClothesInput) =>{
    const validator = new Validator()

    const {name,status} = input

    const names = validator
                  .notEmpty()
                  .min(2)
                  .max(60)
                  
                  .validate(name,"name")

 

    const statuses = validator
                     .notEmpty()
                     .validate(status,"status")
                     
    if(!statuses.status) return statuses
    if(!names.status) return names
    return {
        status:true,
        message:"No Error Found"
    }
}