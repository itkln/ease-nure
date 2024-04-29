import React, {useState} from 'react';

function useFileAdd() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    const handleAddFile = (receipt: Receipt | null) => {
        if (!receipt) return;
        setReceipts(prevReceipts => [...prevReceipts, receipt]);
    };

    const handleRemoveFile = (index: number) => {
        setReceipts(prevReceipts => prevReceipts.filter((_, idx) => idx !== index));
    };

    return { receipts, setReceipts, handleAdd: handleAddFile, handleRemove: handleRemoveFile };
}

export default useFileAdd;