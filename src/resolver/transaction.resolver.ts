import { Resolver } from "type-graphql"
import { TransactionService } from "../services/transaction.service"

@Resolver()
export class TransactionResolver {
    constructor(private transactionService: TransactionService) {
        this.transactionService = new TransactionService()
    }

}