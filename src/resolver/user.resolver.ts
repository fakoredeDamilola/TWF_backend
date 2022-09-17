import { PubSubEngine, withFilter } from "graphql-subscriptions";
import { Arg, Mutation, Query, Resolver, Ctx, Authorized, Args, PubSub, Subscription, Root } from "type-graphql";
import { AddItemToCartResponse, AuthenticationResponse, userDataMonthlyResponse, UserResponse, UserSuccessResponse } from "../Response/AuthenticationResponse";
import { ClientResponse, NotificationResponseSub } from "../Response/Client";
import { MeasurementFrameResponse, ProfilePictureResponse } from "../Response/MeasurementFrame";
import { Notifications } from "../schema/Notification.schema";
import { UserService } from "../services/user.service";
import IContext from "../types/context";
import { CartInput, ClientInput, FetchUserInput, LoginInput, MeasurementFrameInput, NotificationPayload, ProfilePictureInput, RegisterInput } from "../types/input";

@Resolver()
export class UserResolver {

    constructor(private userService: UserService) {
        this.userService= new UserService()
    }
@Query(()=>String)
data(){
    return "data first"
}

@Authorized()
@Query(()=>userDataMonthlyResponse)
userData(@Ctx() context:IContext){
    return this.userService.getUserData(context)
}


@Mutation(()=>AuthenticationResponse)
register(@Arg('input') input:RegisterInput){
    // console.log({input})
    return this.userService.register(input)
}

@Mutation(()=>AuthenticationResponse)
login(@Arg('input') input: LoginInput){
    return this.userService.login(input)
}

@Authorized()
@Mutation(() => MeasurementFrameResponse)
addMeasurementFrame(@Arg('input',()=>[MeasurementFrameInput]) input: MeasurementFrameInput,@Ctx () context:IContext){
    return this.userService.addMeasurementFrame(input,context)
}

@Authorized()
@Mutation(() => AddItemToCartResponse)
addItemToCart(@Arg('input') input: CartInput,@Ctx () context:IContext, @PubSub() pubSub: PubSubEngine){
    return this.userService.addItemToCart(input,context,pubSub)
}



@Query(() => UserResponse)
userByDetails(@Arg('input') input: FetchUserInput){
    return this.userService.fetchUserByDetails(input)
}

@Authorized()
@Query(() => UserResponse)
userLogin(@Ctx() context:IContext){
    return this.userService.fetchLoggedInUser(context)
}

@Subscription({ 
    topics: "NOTIFICATIONS",
   
})
newNotification(
    @Root() param: NotificationPayload
    ): NotificationResponseSub {
  return { ...param };
}

}