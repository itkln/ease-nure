import React from "react";
import LabelInput from "@/components/LabelInput";
import {DatePicker} from "@/app/api/v1/receipts/_components/DatePicker";

interface ReceiptInfoProps {
    receiptInfo: ReceiptInfo;
    isReviewed: boolean
    onReceiptInfoChange: (field: keyof ReceiptInfo, value: string | number | Date) => void
}

export const ReceiptInfoTab = ({receiptInfo, onReceiptInfoChange, isReviewed}: ReceiptInfoProps) => {
    return (
        <div
            className="flex-auto w-full flex flex-col justify-center gap-2 py-3 sm:max-md:max-h-[400px] sm:max-md:overflow-auto">
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Store" name="store"
                        value={receiptInfo.store}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Category" name="category"
                        value={receiptInfo.category}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Country" name="country"
                        value={receiptInfo.country}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="City" name="city"
                        value={receiptInfo.city}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Address" name="address"
                        value={receiptInfo.address}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Datetime" name="datetime"
                        value={receiptInfo.datetime.toString()}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Currency" name="currency"
                        value={receiptInfo.currency}/>
            <LabelInput onChange={onReceiptInfoChange} isReviewed={isReviewed} label="Total Amount" name="total_amount"
                        type="number" value={receiptInfo.total_amount}/>
        </div>
    )
};