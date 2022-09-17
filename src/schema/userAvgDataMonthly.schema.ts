import { Field, ObjectType } from "type-graphql";


@ObjectType()
export class UserAvgDataMonthly {
    @Field(() => Number)
    clients: number;

    @Field(() => Number)
    clothes:number

    @Field(() => Number)
    completedClothes:number

    @Field(() => Number)
    clothesInProgress:number

    @Field(() => Number)
    clothesToDo:number

}