import React from 'react';
import Image from "next/image";
import {Chip} from "@nextui-org/react";

interface ReceiptProps {
    receipt: ReceiptFile;
    onReceiptShow: (id: string) => void
}

const ReceiptItem = (props: ReceiptProps) => {
    const imageDataUrl = `data:image/jpeg;base64,${props.receipt.content}`;

    const getChipClassNames = (status: string) => {
        switch (status) {
            case 'Pending':
                return {base: 'bg-yellow-200 text-yellow-700'};
            case 'Approved':
                return {base: 'bg-green-200 text-green-700'};
            case 'Rejected':
                return {base: 'bg-red-200 text-red-700'};
            case 'Uploaded':
                return {base: 'bg-orange-200 text-orange-700'};
            default:
                return {base: 'bg-gray-200 text-gray-700'}; // Default or unknown status
        }
    };

    return (
        <div onClick={() => {
            props.onReceiptShow(props.receipt.id)
        }} className="receipt-item relative px-3 w-full max-h-[200px] rounded border-2 border-solid hover:border-blue-600 transition duration-200 cursor-pointer">
            <Chip classNames={getChipClassNames(props.receipt.status)} className="absolute left-2 top-2">{props.receipt.status}</Chip>
            <Image className="object-contain h-48 w-96"  width="1000" height="1000" src={imageDataUrl} alt="receipt-image" />
            <div className="absolute left-0 bottom-0 py-1 bg-opacity-50 text-sm bg-black w-full text-white">{props.receipt.filename}</div>
        </div>
    );
};

export default ReceiptItem;