'use client'

import React, {useState} from "react";
import useGetAllReceipts from "@/app/api/v1/receipts/hooks/useGetAllReceipts";
import ReceiptItem from "@/app/api/v1/receipts/_components/ReceiptItem";
import ReceiptDialog from "@/app/api/v1/receipts/_components/ReceiptDialog";
import ReceiptStatusPicker from "@/app/api/v1/receipts/_components/ReceiptStatusPicker";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";

const ReceiptsPage = () => {
    const {isLoading, data, isError, error} = useGetAllReceipts();

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        </div>
    );
    if (isError) return <span>Error: {error?.message}</span>;

    return (
        <div className="container py-3">
            <div className="flex gap-2 mb-3">
                <Input type="text" placeholder="Search" />
                {data && data.length > 0 && <ReceiptStatusPicker receipts={data}/>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data && data.length > 0 ? (
                    data.map((receipt, idx) => (
                        <React.Fragment key={receipt.id}>
                            <ReceiptDialog receipt={receipt} trigger={<ReceiptItem receipt={receipt}/>}/>
                        </React.Fragment>
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center">
                        <span>No receipts yet.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReceiptsPage;
