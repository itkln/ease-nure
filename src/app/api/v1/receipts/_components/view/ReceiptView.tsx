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
        <div className="receipts-main__view hidden md:flex justify-center items-center p-3">
            <img className="object-contain hover:scale-150 transition-all duration-200 max-h-[600px] max-w-[300px]" src={imageDataUrl} alt="Receipt Image" />
        </div>
    );

};

export default ReceiptView;