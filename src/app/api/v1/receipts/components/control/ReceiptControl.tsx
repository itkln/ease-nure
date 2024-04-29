import React, {useEffect, useState} from 'react';
import {Button, Chip} from "@nextui-org/react";
import useGetReceiptById from '../../hooks/useGetReceiptByID';
import {ItemsSection} from "@/app/api/v1/receipts/components/control/ItemsSection";
import {ReceiptInfoSection} from "@/app/api/v1/receipts/components/control/ReceiptInfoSection";
import {setChipClassNames} from "@/app/api/v1/receipts/util/chipUtil";
import useApproveFile from "@/app/api/v1/receipts/hooks/useApproveFile";
import receiptItem from "@/app/api/v1/receipts/components/nav/ReceiptItem";

interface IReceiptControlProps {
    receipt: ReceiptFile;
}

function isStatusValid(status: string): boolean {
    return status !== "Uploaded" &&
        status !== "Approved";
}

function getDefaultReceiptInfo(): ReceiptInfo {
    return {
        store: '',
        category: '',
        country: '',
        city: '',
        address: '',
        total_amount: 0,
        currency: '',
        datetime: new Date(),
        items: []
    };
}

const ReceiptControl = ({receipt}: IReceiptControlProps) => {
    const [modifiedReceiptInfo, setModifiedReceiptInfo] = useState<ReceiptInfo>(getDefaultReceiptInfo())
    const [modifiedItems, setModifiedItems] = useState<Item[]>([])
    const {receiptInfo, isLoading, isError} = useGetReceiptById(receipt);
    const {mutate} = useApproveFile()

    useEffect(() => {
        if (receiptInfo) {
            setModifiedReceiptInfo(receiptInfo)
            setModifiedItems(receiptInfo.items)
        }
    }, [receiptInfo]);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !receiptInfo) return <div>Error or no data available.</div>;

    const onApproveFile = () => {
        modifiedReceiptInfo.items = modifiedItems
        mutate({id: receipt.id, receiptInfo: modifiedReceiptInfo})
    }

    const onReceiptInfoChange = (field: keyof ReceiptInfo, value: string | number | Date) => {
        setModifiedReceiptInfo(prev => ({
            ...(prev as ReceiptInfo), // Typecast prev to ReceiptInfo to ensure compatibility
            [field]: value !== undefined ? value : (field === 'total_amount' ? value : ""), // Initialize to 0 if it's a number field, otherwise to an empty string
        }));
    };

    const onItemChange = (id: number, newItem: Item) => {
        newItem.total_price = newItem.quantity * parseFloat(newItem.unit_price)
        setModifiedItems(prevItems => prevItems.map((item, index) =>
            index === id ? {...item, ...newItem} : item
        ))
    }

    return (
        <div className="receipts-main__control basis-2/5 md:basis-3/5 bg-white flex flex-col">
            <div className="p-5 border-b-2 border-solid">
                <div className="inline-flex space-x-3 items-center">
                    <h1 className="font-bold">{receipt.filename}</h1>
                    <Chip className={setChipClassNames(receipt.status)}>{receipt.status}</Chip>
                </div>
            </div>
            {receipt.status !== "Uploaded" && (
                <div className="lg:min-h-[800px]">
                    <ReceiptInfoSection onReceiptInfoChange={onReceiptInfoChange}
                                        receiptInfo={modifiedReceiptInfo}/>
                    <ItemsSection items={modifiedItems} currency={receiptInfo.currency}
                                  onItemChange={onItemChange}/>
                </div>
            )}
            {isStatusValid(receipt.status) && (
                <div className="mt-auto flex-col justify-between space-x-5 border-t-2 border-solid">
                    <div className="flex space-x-5 p-5">
                        <Button size="lg" fullWidth color="danger" variant={"flat"}>
                            Reject file
                        </Button>
                        <Button size="lg" onClick={onApproveFile} color={"primary"} fullWidth>
                            Approve file
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReceiptControl;