import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddClientClothesResponse, AddClothesImageResponse, AddClothesMaterialResponse, AllClientClothes, ClientClothResponse, DeletedItemResponse } from "../Response/Client";
import { ClothesService } from "../services/clothes.service";
import IContext from "../types/context";
import { AddClientClothesInput, AddClothesImageInput, AddClothesMaterialInput, ClothesPriceInput, DeleteMaterialInput, SearchParamsInput } from "../types/input";


@Resolver()

export class clothesResolver {
    constructor(private clothesService: ClothesService) {
        this.clothesService = new ClothesService()
    }

@Authorized()
@Mutation(()=> AddClientClothesResponse)
addClothes(@Arg('input') input:AddClientClothesInput, @Ctx() context:IContext){
return this.clothesService.addClothes(input,context)
}

@Authorized()
@Mutation(()=> AddClothesMaterialResponse)
addClothesMaterial(@Arg('input') input: AddClothesMaterialInput, @Ctx() context: IContext){
    return this.clothesService.addClothesMaterial(input,context)
}

@Authorized()
@Mutation(()=> AddClothesMaterialResponse)
editClothesMaterial(@Arg('input') input: AddClothesMaterialInput, @Ctx() context: IContext){
    return this.clothesService.editClothesMaterial(input,context)
}

@Authorized()
@Mutation(()=> ClientClothResponse)
addClothesAmountTotal(@Arg('input') input: ClothesPriceInput, @Ctx() context: IContext){
    return this.clothesService.addTotalPrice(input)
}

@Authorized()
@Mutation(() => AddClothesImageResponse)
addClothesImage(@Arg('input') input: AddClothesImageInput, @Ctx() context: IContext){
    return this.clothesService.addClothesImage(input,context)
}

@Authorized()
@Mutation(() => AddClothesImageResponse)
addMaterialImage(@Arg('input') input: AddClothesImageInput, @Ctx() context: IContext){
    return this.clothesService.addMaterialImage(input,context)
}



@Authorized()
@Mutation(() => DeletedItemResponse)
deleteMaterialInput(@Arg('input') input: DeleteMaterialInput, @Ctx() context: IContext){
    return this.clothesService.deleteMaterial(input,context)
}


@Authorized()
@Query(()=> ClientClothResponse)
clientCloth (@Arg('input') input:string){
    return this.clothesService.getClientClothes(input)
}

@Authorized()
@Query(()=>AllClientClothes)
allClientClothes(@Arg('input') input:string, @Ctx() context:IContext){
    return this.clothesService.allClientClothes(input,context)
}

@Authorized()
@Query(()=>AllClientClothes)
allClientsClothes(@Arg('params') params:SearchParamsInput, @Ctx() context:IContext){
    return this.clothesService.allClientsClothes(params,context)
}


}