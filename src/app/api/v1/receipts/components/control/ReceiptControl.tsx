import React from 'react';
import {
    Accordion,
    AccordionItem, Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import InputField from "@/components/input/input";

const ReceiptControl = () => {
    return (
        <div className="receipts-main__control basis-1/3 h-30 bg-white flex flex-col">
            <div className="receipts-control__head space-y-5 p-5 border-solid border-b-2">
                <div className="receipts-control__info inline-flex space-x-3">
                    <h1 className="font-bold">Lidl_Receipt.pdf</h1>
                    <Chip classNames={{base: "bg-red-200 text-red-700"}}>Cancelled</Chip>
                </div>
                {/*  TODO: Create JSON representation  */}
            </div>
            <div className="receipts-control__extracted-fields space-x-3 py-2 px-4 border-solid border-b-2">
                <Accordion showDivider={false} selectionMode='multiple'>
                    <AccordionItem className="receipts-data__extracted"
                                   classNames={{title: "text-md font-bold"}} key="1"
                                   aria-label="EXTRACTED FIELDS" title="EXTRACTED FIELDS">
                        <div className="receipts-extracted__inputs space-y-3">
                            <InputField label="Store"/>
                            <InputField label="Country"/>
                            <InputField label="City"/>
                            <InputField label="Address"/>
                            <InputField label="Category"/>
                            <InputField label="Total Amount"/>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="receipts-control__line-items space-x-3 py-2 px-4 border-solid border-b-2">
                <Accordion showDivider={false} selectionMode='multiple'>
                    <AccordionItem className="receipts-data__extracted"
                                   classNames={{title: "text-md font-bold"}} key="1"
                                   aria-label="LINE ITEMS" title="LINE ITEMS">
                        <Table isStriped removeWrapper shadow="none" aria-label="Example static collection table">
                            <TableHeader>
                                <TableColumn>#</TableColumn>
                                <TableColumn width={50} align="center">Qty</TableColumn>
                                <TableColumn>Product name</TableColumn>
                                <TableColumn width={50} align="center">Unit price</TableColumn>
                                <TableColumn width={50} align="center">Total price</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Banana</TableCell>
                                    <TableCell>1.50</TableCell>
                                    <TableCell>1.50</TableCell>
                                </TableRow>
                                <TableRow key="1">
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Banana</TableCell>
                                    <TableCell>1.50</TableCell>
                                    <TableCell>1.50</TableCell>
                                </TableRow>
                                <TableRow key="1">
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Banana</TableCell>
                                    <TableCell>1.50</TableCell>
                                    <TableCell>1.50</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="receipts-control__btn border-t-2 border-solid mt-auto flex-col justify-between space-x-5">
                <div className="flex space-x-5 p-5">
                    <Button fullWidth color="danger" variant="flat">
                        Reject file
                    </Button>
                    <Button fullWidth color="default" variant="solid">
                        Approve file
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptControl;