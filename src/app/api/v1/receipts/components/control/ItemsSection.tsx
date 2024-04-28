import React from "react";
import {
    Accordion,
    AccordionItem, Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {EditableCell} from "@/app/api/v1/receipts/components/control/EditableCell";
import {Tooltip} from "@mui/material";

interface ReceiptItemsProps {
    items: Item[];
    currency: string;
    onItemChange: (id: number, item: Item) => void
}

export const ItemsSection: React.FC<ReceiptItemsProps> = ({items, currency, onItemChange}) => (
    <div className="py-2 px-4 border-b-2 border-solid">
        <Accordion showDivider={false} selectionMode="multiple">
            <AccordionItem title="LINE ITEMS" className="text-md">
                {items && (
                    <Table className="overflow-auto sm:w-[700px] md:w-full lg:h-[320px] overflow-x-auto" removeWrapper
                           shadow="none"
                           aria-label="Table of items">
                        <TableHeader>
                            <TableColumn width={50}>#</TableColumn>
                            <TableColumn width={100} align="center">Qty</TableColumn>
                            <TableColumn>Product name</TableColumn>
                            <TableColumn width={115} align="center">Unit price</TableColumn>
                            <TableColumn width={100} align="center">Total price</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => {
                                // Check if quantity * unit_price equals total_price
                                const calculatedTotalPrice = Number((item.quantity * parseFloat(item.unit_price)).toFixed(2));
                                const isValid = calculatedTotalPrice === Number(item.total_price.toFixed(2));
                                const bgColorClass = isValid ? "bg-green-200" : "bg-red-200"; // Green if valid, red if not

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Tooltip title={item.quantity.toString()}>
                                                <Input size={"sm"} type="number" value={item.quantity.toString()}
                                                       onChange={event => onItemChange(index, {
                                                           ...item,
                                                           quantity: parseFloat(event.target.value)
                                                       })}
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={item.description}>
                                                <Input size={"sm"} type="text" value={item.description}
                                                       onChange={event => onItemChange(index, {
                                                           ...item,
                                                           description: event.target.value
                                                       })}
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={parseFloat(item.unit_price).toFixed(2)}>
                                                <Input size={"sm"} value={item.unit_price}
                                                       onChange={e => {
                                                           const newValue = e.target.value;
                                                           if (/^\d*\.?\d*$/.test(newValue) || newValue === "") { // Ensure input is valid or empty
                                                               console.log("check")
                                                               onItemChange(index, {
                                                                   ...item,
                                                                   unit_price: newValue
                                                               });
                                                           }
                                                       }}
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`${bgColorClass} text-center py-1 rounded-md font-bold`}>
                                                {item.total_price.toFixed(2)} {currency}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </AccordionItem>
        </Accordion>
    </div>
);