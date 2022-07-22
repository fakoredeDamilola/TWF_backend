import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AddClientClothesResponse, AddClothesMaterialResponse, ClientResponse } from "../Response/Client";
import { MeasurementFrameResponse } from "../Response/MeasurementFrame";
import { ClientService } from "../services/client.service";
import IContext from "../types/context";
import { AddClientClothesInput, AddClothesMaterialInput, ClientInput, ClientMeasurementInput, MaterialInput, MeasurementFrameInput } from "../types/input";

@Resolver()

export class clientResolver {
    constructor(private clientService: ClientService) {
        this.clientService = new ClientService()
    }

@Authorized()
@Mutation(()=>ClientResponse)
addClient(@Arg('input') input:ClientInput, @Ctx() context:IContext){
    return this.clientService.addClient(input, context)
}


@Authorized()
@Mutation(() => MeasurementFrameResponse)
addMeasurement(@Arg('input') input:ClientMeasurementInput, @Ctx() context:IContext){
    return this.clientService.addMeasurement(input,context)
}

@Authorized()
@Mutation(()=> AddClientClothesResponse)
addClothes(@Arg('input') input:AddClientClothesInput, @Ctx() context:IContext){
return this.clientService.addClothes(input,context)
}

@Authorized()
@Mutation(()=> AddClothesMaterialResponse)
addClothesMaterial(@Arg('input') input: AddClothesMaterialInput, @Ctx() context: IContext){
    return this.clientService.addClothesMaterial(input,context)
}
}
