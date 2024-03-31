import React from 'react';
import Image from "next/image";
import Receipt from "@/assets/images/receipt.jpg"
import {Chip} from "@nextui-org/react";
import {IReceipt} from "@/app/api/v1/receipts/services/receipt.service";

interface ReceiptProps {
    receipt: IReceipt;
}

const ReceiptItem = ({receipt}: ReceiptProps) => {
    const imageDataUrl = `data:image/jpeg;base64,${receipt.filedata}`;

    return (
        <div className="receipt-item relative w-full max-h-[200px] rounded border-2 border-solid hover:border-blue-600 transition duration-200 cursor-pointer">
            <Chip classNames={{base: "bg-orange-200 text-orange-700"}} className="absolute left-2 top-2">{receipt.current_status}</Chip>
            <Image className="object-contain h-48 w-96"  width="1000" height="1000" src={imageDataUrl} alt="receipt-image" />
        </div>
    );
};

export default ReceiptItem;