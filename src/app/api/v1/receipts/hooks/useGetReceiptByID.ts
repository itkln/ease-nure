import { useQuery } from "@tanstack/react-query";
import receiptService from "@/app/api/v1/receipts/service/receipt.service";
interface UseReceiptByIdResult {
    receiptInfo: ReceiptInfo | undefined;
    isLoading: boolean;
    isError: boolean;
}

const useGetReceiptById = (receiptID: string | null): UseReceiptByIdResult => {
    const {data: receiptInfo, isLoading, isError} = useQuery<ReceiptInfo, Error>({
        queryKey: ['receipt', receiptID],
        queryFn: () => receiptService.getById(receiptID!).then(response => response.data.receipt),
        enabled: !!receiptID
    });

    return {receiptInfo, isLoading, isError};
}

export default useGetReceiptById;