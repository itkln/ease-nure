import React, {useState} from 'react';
import {Input, ScrollShadow, Select, SelectItem} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import ReceiptItem from "@/app/api/v1/receipts/components/nav/ReceiptItem";
import {CloseRounded} from "@mui/icons-material";
import receiptItem from "@/app/api/v1/receipts/components/nav/ReceiptItem";
import ReceiptStatusSelector from "@/app/api/v1/receipts/components/nav/ReceiptStatusSelector";

interface IReceiptNav {
    receipts: ReceiptFile[]
    onReceiptShow: (fileID: string) => void
    onReceiptNavShow: () => void
}

const ReceiptNav = (props: IReceiptNav) => {

    return (
        <div
            className={`receipts-main__nav z-10 absolute sm:w-full lg:w-fit top-0 h-full basis-full transition-width duration-500 md:basis-1/5 bg-white border-r md:border-none`}>
            <div className="receipts_nav__close py-2 px-2 flex justify-end">
                <CloseRounded
                    className="cursor-pointer hover:bg-gray-200 transition duration-200 px-[3px] border-2 border-solid rounded-md"
                    fontSize="large" onClick={props.onReceiptNavShow}/>
            </div>
            <div className="receipts-nav__search border-y-2 border-solid">
                <Input
                    placeholder="Search"
                    className="bg-none"
                    isClearable
                    radius="none"
                    startContent={
                        <SearchIcon/>
                    }
                    aria-label="Search receipts"
                    classNames={{
                        inputWrapper: ["bg-transparent", "shadow-none"],
                        input: ["bg-transparent", "shadow-none"],
                    }}
                />
            </div>
            <div className="receipts-nav__search border-b-2 w-full flex justify-center py-3 border-solid">
                <ReceiptStatusSelector receipts={props.receipts}/>
            </div>
            <div className="receipts-nav__items text-center p-6 flex justify-center">
                <div className="w-[300px] sm:h-[650px] lg:h-[750px] overflow-auto space-y-3">
                    {props.receipts.map((receipt, idx) => {
                        return <ReceiptItem key={idx} onReceiptShow={props.onReceiptShow} receipt={receipt}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReceiptNav;