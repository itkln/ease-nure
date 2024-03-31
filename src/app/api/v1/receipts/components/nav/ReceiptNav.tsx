import React from 'react';
import {Input, ScrollShadow, Select, SelectItem} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import ReceiptItem from "@/app/api/v1/receipts/components/nav/receipt-item/ReceiptItem";
import {IReceipt} from "@/app/api/v1/receipts/services/receipt.service";

interface IReceiptNav {
    receipts: IReceipt[]
}

const ReceiptNav = ({receipts}: IReceiptNav) => {
    return (
        <div className="receipts-main__nav basis-1/5 bg-white">
            <div className="receipts-nav__search border-b-2 border-solid">
                <Input
                    placeholder="Search"
                    className="bg-none"
                    isClearable
                    radius="none"
                    startContent={
                        <SearchIcon/>
                    }
                    classNames={{
                        inputWrapper: ["bg-transparent", "shadow-none"],
                        input: ["bg-transparent", "shadow-none"],
                    }}
                />
            </div>
            <div className="receipts-nav__search border-b-2 w-full flex justify-center py-3 border-solid">
                <Select
                    items={["Car", "Bus", "Foot"]}
                    placeholder="Select category"
                    className="max-w-xs"
                >
                    <SelectItem key={1}>Item</SelectItem>
                </Select>
            </div>
            <div className="receipts-nav__items text-center p-6 flex justify-center">
                <ScrollShadow hideScrollBar className="w-[300px] h-[720px] space-y-5 ">
                    {receipts.map((receipt, key) => {
                        return <ReceiptItem key={key} receipt={receipt}/>
                    })}
                </ScrollShadow>
            </div>
        </div>
    );
};

export default ReceiptNav;