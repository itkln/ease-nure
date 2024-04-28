import React from "react";
import InputField from "@/components/input/input";

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    onReceiptInfoChange: (field: keyof ReceiptInfo, value: string | number | Date) => void
}

export const ReceiptInfoSection = ({receiptInfo, onReceiptInfoChange}: ReceiptInfoProps) => {
    return (
        <div className="py-2 px-4 border-b-2 border-solid">
            <div className='space-y-3'>
                <InputField onChange={onReceiptInfoChange} label="Store" name="store" value={receiptInfo.store}/>
                <InputField onChange={onReceiptInfoChange} label="Category" name="category" value={receiptInfo.category}/>
                <InputField onChange={onReceiptInfoChange} label="Country" name="country" value={receiptInfo.country}/>
                <InputField onChange={onReceiptInfoChange} label="City" name="city" value={receiptInfo.city}/>
                <InputField onChange={onReceiptInfoChange} label="Address" name="address" value={receiptInfo.address}/>
                <InputField onChange={onReceiptInfoChange} label="Datetime" name="datetime" value={receiptInfo.datetime.toString()}/>
                <InputField onChange={onReceiptInfoChange} label="Currency" name="currency" value={receiptInfo.currency}/>
                <InputField onChange={onReceiptInfoChange} label="Total Amount" name="total_amount" type="number" value={receiptInfo.total_amount.toFixed(2)}/>
            </div>
        </div>
    )
};