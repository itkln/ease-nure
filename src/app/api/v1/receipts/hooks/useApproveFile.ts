import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReceiptService from "@/app/api/v1/receipts/services/receipt.service";

interface ApproveFileResponse {
    timestamp: string
    id: string
}

const useApproveFile = () => {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (props: {id: string, receiptInfo: ReceiptInfo}) => ReceiptService.approve(props.id, props.receiptInfo),
            onSuccess: (response) => {
                console.log("File approving: ", response.data.id)
                queryClient.invalidateQueries({queryKey: ['receipts']})
            }
        })
    );
};

export default useApproveFile;