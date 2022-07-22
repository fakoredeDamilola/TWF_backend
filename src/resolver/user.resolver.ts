import { Arg, Mutation, Query, Resolver, Ctx, Authorized, Args } from "type-graphql";
import { AuthenticationResponse } from "../Response/AuthenticationResponse";
import { ClientResponse } from "../Response/Client";
import { MeasurementFrameResponse, ProfilePictureResponse } from "../Response/MeasurementFrame";
import { UserService } from "../services/user.service";
import IContext from "../types/context";
import { ClientInput, LoginInput, MeasurementFrameInput, ProfilePictureInput, RegisterInput } from "../types/input";

@Resolver()
export class UserResolver {

    constructor(private userService: UserService) {
        this.userService= new UserService()
    }
@Query(()=>String)
data(){
    return "data first"
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


}