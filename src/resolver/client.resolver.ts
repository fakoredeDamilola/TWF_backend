import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {  AddClientImageResponse, ClientListResponse, ClientMeasurementResult, ClientResponse, DeletedItemResponse } from "../Response/Client";
import { MeasurementFrameResponse } from "../Response/MeasurementFrame";
import { ClientService } from "../services/client.service";
import IContext from "../types/context";
import { AddClothesImageInput, ClientInput, ClientMeasurementInput, DeleteMaterialInput, ParamsInput } from "../types/input";

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
@Mutation(() => AddClientImageResponse)
addClientImage(@Arg('input') input: AddClothesImageInput, @Ctx() context: IContext){
    return this.clientService.addClientImage(input,context)
}

@Authorized()
@Mutation(() => MeasurementFrameResponse)
addMeasurement(@Arg('input') input:ClientMeasurementInput, @Ctx() context:IContext){
    return this.clientService.addMeasurement(input,context)
}

@Authorized()
@Mutation(() => MeasurementFrameResponse)
editMeasurement(@Arg('input') input:ClientMeasurementInput, @Ctx() context:IContext){
    return this.clientService.editMeasurement(input,context)
}


@Authorized()
@Mutation(() => DeletedItemResponse)
deleteClientMeasurement(@Arg('input') input: DeleteMaterialInput, @Ctx() context: IContext){
    return this.clientService.deleteMeasurement(input,context)
}

@Authorized()
@Query(() => ClientListResponse)
clientList(@Arg('params')params:ParamsInput, @Ctx() context: IContext){
    return this.clientService.clientList(params,context)
}

@Authorized()
@Query(() => ClientResponse)
getClient(@Arg('input') input:string,@Ctx() context: IContext){
    return this.clientService.getClient(input,context)
}

@Authorized()
@Query(() => ClientMeasurementResult)
clientMeasurement(@Arg('input') input: string){
    return this.clientService.clientMeasurement(input)
}
}
