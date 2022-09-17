import { clientResolver } from "./client.resolver";
import { clothesResolver } from "./clothes.resolver";
import { UserResolver } from "./user.resolver";
import { StoreResolver } from "./store.resolver"
import { NotificationResolver } from "./notification.resolver";
import { TransactionResolver } from "./transaction.resolver";


export const Resolvers = [UserResolver, clientResolver, clothesResolver, StoreResolver,NotificationResolver,TransactionResolver] as const