import { clientResolver } from "./client.resolver";
import { UserResolver } from "./user.resolver";

export const resolvers = [UserResolver, clientResolver] as const