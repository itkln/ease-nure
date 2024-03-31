'use client'

import {NextUIProvider} from "@nextui-org/react";
import ReceiptControl from "@/app/api/v1/receipts/components/control/ReceiptControl";
import ReceiptNav from "@/app/api/v1/receipts/components/nav/ReceiptNav";
import ReceiptView from "@/app/api/v1/receipts/components/view/ReceiptView";
import Image from "next/image";
import easeLogo from "@/assets/images/easeLedger.svg";
import Link from "next/link";
import Button from "@/components/button/button";
import FileUploadModal from "@/app/api/v1/components/modal/FileUploadModal";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ReceiptService from "@/app/api/v1/receipts/services/receipt.service";

const Receipts = () => {
    const [isUploadOpen, setUploadOpen] = useState<boolean>(false);

    const {isLoading, data, isError, error} = useQuery({
        queryKey: ["receipts"],
        queryFn: () => ReceiptService.getAll(),
        select: (response) => {
            if (response.data) {
                return response.data.receipt
            }
        }
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <>
            <NextUIProvider>
                <header className="bg-[#0E1218] flex items-center justify-between py-2 px-6">
                    <Image src={easeLogo} alt={"Ease Logo"}/>
                    <div className="header-links ml-20 flex space-x-10 text-[#E4E4E4] text-sm">
                        <div className="header-links_receipts hover:opacity-70 transition duration-200 ease-in">
                            <Link href="/api/v1/receipts">Receipts</Link>
                        </div>
                        <div className="header-links_transactions hover:opacity-70 transition duration-200 ease-in">
                            <Link href="/api/v1/transactions">Transactions</Link>
                        </div>
                    </div>
                    <Button title={"Upload file"} onClick={() => setUploadOpen(true)}/>
                </header>
                <div className="receipts-info bg-white flex justify-between py-5 px-6 border-solid border-b-2">
                    <div className="receipts-info__name">
                        Lidl_Receipt.pdf
                    </div>
                    <div className="receipts-info__last-modified">
                        Last modified: 11/06/2023 at 9:45 AM
                    </div>
                </div>
                <div className="receipts-main flex flex-basis justify-between">
                    {isLoading ? (<div>Loading...</div>) : data?.length ? (<ReceiptNav receipts={data}/>) : (
                        <ReceiptNav receipts={[]}/>)}
                    <ReceiptView/>
                    <ReceiptControl/>
                </div>
                <FileUploadModal isOpen={isUploadOpen} onClose={() => setUploadOpen(false)}/>
            </NextUIProvider>
        </>
    );
}

export default Receipts;
