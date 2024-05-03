import React from "react";
import {Tooltip} from "@mui/material";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

interface Props {
    items: Item[]
    currency: string
    isReviewed: boolean
    onItemChange: (id: number, item: Item) => void
}

export const ItemsTab = ({items, currency, onItemChange, isReviewed}: Props) => {
    let totalAmount = 0;
    return (
        <>
            {items && (
                <div className="relative w-full overflow-auto max-h-[400px]">
                    <Table className="sm:w-[700px] md:w-full sm:overflow-x-auto"
                           aria-label="Table of items">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">#</TableHead>
                                <TableHead className="w-[140px]" align="center">Qty</TableHead>
                                <TableHead className="w-[350px]">Product name</TableHead>
                                <TableHead className="w-[140px]" align="center">Unit price</TableHead>
                                <TableHead className="w-[90px]" align="center">Total price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => {
                                // Check if quantity * unit_price equals total_price
                                const calculatedTotalPrice = Number((item.quantity * item.unit_price).toFixed(2));
                                const isValid = calculatedTotalPrice === Number(item.total_price);
                                const bgColorClass = isValid ? "bg-approved" : "bg-rejected";
                                totalAmount += calculatedTotalPrice;

                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Tooltip title={item.quantity.toString()}>
                                                <Input type="number" value={item.quantity.toString()}
                                                       onChange={event => onItemChange(index, {
                                                           ...item,
                                                           quantity: parseFloat(event.target.value)
                                                       })}
                                                       readOnly={isReviewed}
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={item.description}>
                                                <Input type="text" value={item.description}
                                                       onChange={event => onItemChange(index, {
                                                           ...item,
                                                           description: event.target.value
                                                       })}
                                                       readOnly={isReviewed}
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={item.unit_price.toFixed(2)}>
                                                <Input value={item.unit_price}
                                                       onChange={e => {
                                                           const newValue = e.target.value;
                                                           if (/^\d*\.?\d*$/.test(newValue) || newValue === "") { // Ensure input is valid or empty
                                                               onItemChange(index, {
                                                                   ...item,
                                                                   unit_price: Number(newValue)
                                                               });
                                                           }
                                                       }}
                                                       readOnly={isReviewed}
                                                       type="number"
                                                       aria-label="Line of item"/>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`${bgColorClass} text-center w-[100px] py-1 text-background rounded-md font-bold`}>
                                                {item.total_price} {currency}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Total</TableCell>
                                <TableCell className="text-right">{currency} {" "} {totalAmount.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            )}
        </>
    )
};