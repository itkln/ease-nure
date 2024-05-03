import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReceiptService from "@/app/api/v1/receipts/service/receipt.service";

const useRejectFile = () => {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (props: {id: string}) => ReceiptService.reject(props.id),
            onSuccess: (response) => {
                console.log("File rejected: ", response.data.id)
                queryClient.invalidateQueries({queryKey: ['receipts']})
            }
        })
    );
};

export default useRejectFile;