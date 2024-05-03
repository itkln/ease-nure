import React from 'react';
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

interface ReceiptProps {
    receipt: ReceiptFile;
}

const ReceiptItem = (props: ReceiptProps) => {
    const imageDataUrl = `data:image/jpeg;base64,${props.receipt.content}`;

    const getChipClassNames = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-pending border-yellow-600';
            case 'Approved':
                return 'bg-approved border-green-600';
            case 'Rejected':
                return 'bg-rejected border-rose-600';
            case 'Uploaded':
                return 'bg-uploaded border-orange-600';
            default:
                return 'bg-gray-200 border-gray-300 text-gray-700'; // Default or unknown status
        }
    };

    return (
        <div className="receipt-item flex justify-center relative w-full text-center bg-orange-95 rounded-lg border border-solid hover:border-blue-600 cursor-pointer">
            <Badge variant="outline" className={`${getChipClassNames(props.receipt.status)} text-white absolute left-2 top-2`}>{props.receipt.status}</Badge>
            <Image className="object-contain h-72"  width="1000" height="1000" src={imageDataUrl} alt="receipt-image" />
            <div className="absolute left-0 bottom-0 py-1 bg-opacity-50 text-sm bg-black w-full rounded-b-lg text-white">{props.receipt.filename}</div>
        </div>
    );
};

export default ReceiptItem;