import {transactionClient} from "@/app/api/v1/transactions/api/transaction/api";

interface IGetAllTransactions {
    status: string
    count: number
    transactions: TransactionType[]
}

class TransactionService {
    async getAll() {
        return transactionClient.get<IGetAllTransactions>("/transactions")
    }
}

export default new TransactionService();