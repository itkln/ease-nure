import {useQuery} from "@tanstack/react-query";
import TransactionService from "@/app/api/v1/transactions/service/transaction.service";

const useGetAllTransactions = () => {
    const {data: transactions, isError, isLoading, error} = useQuery<TransactionType[], Error>({
        queryKey: ["transactions"],
        queryFn: () => TransactionService.getAll().then(response => response.data.transactions)
    })

    return {transactions, isError, isLoading, error}
};

export default useGetAllTransactions;