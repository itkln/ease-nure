import { useQuery } from "@tanstack/react-query";
import receiptService from "../services/receipt.service";

const useGetReceiptById = (receipt: ReceiptFile) => {
    const {data: receiptInfo, isLoading, isError} = useQuery({
        queryKey: ['receipt', receipt.id],
        queryFn: () => receiptService.getById(receipt.id).then((receiptInfo) => receiptInfo.data.receipt),
        enabled: !!receipt.id
    });

    return {receiptInfo, isLoading, isError}
}

export default useGetReceiptById;