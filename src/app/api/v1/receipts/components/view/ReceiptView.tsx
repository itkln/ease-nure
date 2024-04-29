import React from 'react';
import Receipt from "@/assets/images/receipt.jpg";
import Image from "next/image";

interface IReceiptView {
    receipt?: ReceiptFile
}

const ReceiptView = ({receipt}: IReceiptView) => {
    const imageDataUrl = receipt && receipt.content
        ? `data:image/jpeg;base64,${receipt.content}`
        : undefined;

    return (
        <div className="receipts-main__view w-full bg-none flex justify-center items-center p-5">
            {receipt && imageDataUrl ? (
                // Display image if receipt and receipt.filedata are defined
                <img className="object-contain w-fit lg:h-[720px]" src={imageDataUrl} alt="Receipt Image" />
            ) : (
                // Display message if receiptView is undefined
                <div className="opacity-70">Select receipt to view</div>
            )}
        </div>
    );

};

export default ReceiptView;