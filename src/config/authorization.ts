import { AuthChecker } from "type-graphql";
import { UserModel } from "../schema/user.schema";
import IContext from "../types/context";

const customAuthChecker: AuthChecker<IContext> = async ({root, args, context,info},roles) => {
   
const userId = context.user?._id;
 const user = await UserModel.findOne({_id : userId}).lean(); 
if(user){
    return true
}else{
    return false
}
}

export default customAuthChecker