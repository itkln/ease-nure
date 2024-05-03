import React from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ReceiptService from "@/app/api/v1/receipts/service/receipt.service";

interface IFileUploadMutation {
    handleAdd: (receipt: Receipt | null) => void
}

const useFileUpload = (props: IFileUploadMutation) => {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: (formData: FormData) => ReceiptService.upload(formData),
            onSuccess: (response) => {
                console.log("File successfully added: " + response.data.timestamp)
                const receipt: Receipt = {
                    id: response.data.id, // Adjust according to your actual data structure
                    status: response.data.status, // Adjust according to your actual data structure
                    filename: response.data.filename,
                    filetype: response.data.filetype
                };

                props.handleAdd(receipt)
                queryClient.invalidateQueries({queryKey: ['receipts']})
            }
        })
    );
};

export default useFileUpload;