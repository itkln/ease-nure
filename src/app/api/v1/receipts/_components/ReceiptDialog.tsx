import React, {ReactNode, useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import ReceiptView from "@/app/api/v1/receipts/_components/view/ReceiptView";
import {Badge} from "@/components/ui/badge";
import {setChipClassNames} from "@/app/api/v1/receipts/util/chipUtil";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ReceiptInfoTab} from "@/app/api/v1/receipts/_components/tabs/ReceiptInfoTab";
import useGetReceiptById from "@/app/api/v1/receipts/hooks/useGetReceiptByID";
import useApproveFile from "@/app/api/v1/receipts/hooks/useApproveFile";
import {ItemsTab} from "@/app/api/v1/receipts/_components/tabs/ItemsTab";
import {Button} from "@/components/ui/button";
import useRejectFile from "@/app/api/v1/receipts/hooks/useRejectFile";

interface Props {
    trigger: ReactNode
    receipt: ReceiptFile
}

function isStatusValid(status: string): boolean {
    return status !== "Uploaded" &&
        status !== "Approved" &&
        status !== "Rejected";
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

const ReceiptDialog = ({trigger, receipt}: Props) => {
    const [modifiedReceiptInfo, setModifiedReceiptInfo] = useState<ReceiptInfo>(getDefaultReceiptInfo())
    const [modifiedItems, setModifiedItems] = useState<Item[]>([])
    const {receiptInfo, isLoading, isError} = useGetReceiptById(receipt && receipt.status !== 'Uploaded' ? receipt.id : null);
    const {mutate: approveFile} = useApproveFile()
    const {mutate: rejectFile} = useRejectFile()
    const isReviewed = receipt.status === "Approved" || receipt.status === "Rejected"

    useEffect(() => {
        if (receiptInfo) {
            setModifiedReceiptInfo(receiptInfo)
            setModifiedItems(receiptInfo.items)
        }
    }, [receiptInfo]);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !receiptInfo) {
        return trigger
    }

    const onApproveFile = () => {
        modifiedReceiptInfo.items = modifiedItems
        approveFile({id: receipt.id, receiptInfo: modifiedReceiptInfo})
    }

    const onRejectFile = () => {
        rejectFile({id: receipt.id})
    }


    const onReceiptInfoChange = (field: keyof ReceiptInfo, value: string | number | Date) => {
        setModifiedReceiptInfo(prev => ({
            ...(prev as ReceiptInfo), // Typecast prev to ReceiptInfo to ensure compatibility
            [field]: value !== undefined ? value : (field === 'total_amount' ? value : ""), // Initialize to 0 if it's a number field, otherwise to an empty string
        }));
    };

    const onItemChange = (id: number, newItem: Item) => {
        newItem.total_price = newItem.quantity * newItem.unit_price
        setModifiedItems(prevItems => prevItems.map((item, index) =>
            index === id ? {...item, ...newItem} : item
        ))
    }

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent
                className="flex flex-col max-h-[640px] sm:w-11/12 sm:max-w-md md:max-w-[720px] md:max-h-full">
                <DialogHeader>
                    <DialogTitle className="flex flex-wrap gap-2 mt-5 md:mt-0">
                        {receipt.filename}
                        <Badge variant="outline"
                              className={`${setChipClassNames(receipt.status)} text-white`}>
                        {receipt.status}
                    </Badge>
                    </DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="receipt-info">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="receipt-info">Overview</TabsTrigger>
                        <TabsTrigger value="receipt-items">Items</TabsTrigger>
                    </TabsList>
                    <TabsContent value="receipt-info">
                        <div className="md:flex gap-3">
                            <ReceiptView receipt={receipt}/>
                            <ReceiptInfoTab onReceiptInfoChange={onReceiptInfoChange}
                                            isReviewed={isReviewed}
                                            receiptInfo={modifiedReceiptInfo}/>
                        </div>
                    </TabsContent>
                    <TabsContent value="receipt-items">
                        {receipt.status !== "Uploaded" && (
                            <ItemsTab items={modifiedItems}
                                      currency={receiptInfo.currency}
                                      isReviewed={isReviewed}
                                      onItemChange={onItemChange}/>
                        )}
                    </TabsContent>
                </Tabs>
                {isStatusValid(receipt.status) && (
                    <div className="mt-auto flex-col justify-between">
                        <div className="flex space-x-5">
                            <Button variant="outline" className="w-full bg-destructive text-white" size="lg"
                                    onClick={onRejectFile}
                                    color="danger">
                                Reject file
                            </Button>
                            <Button variant="outline" className="w-full bg-approved text-white" size="lg"
                                    onClick={onApproveFile} color={"primary"}>
                                Approve file
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReceiptDialog;