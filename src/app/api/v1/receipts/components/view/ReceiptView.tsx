import React from 'react';
import Receipt from "@/assets/images/receipt.jpg";
import Image from "next/image";

const ReceiptView = () => {
    return (
        <div className="receipts-main__view basis-1/2 w-64 bg-none flex justify-center items-center">
            <Image className="object-contain w-fit h-[720px]" src={Receipt} alt="receipt-image" />
        </div>
    );
};

export default ReceiptView;