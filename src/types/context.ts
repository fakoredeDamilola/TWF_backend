import { Request } from "express";
import { User } from "../schema/user.schema";


export default interface IContext {
    req: Request;
    res: Response;
    user: User | null
}