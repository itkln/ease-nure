import React from 'react';
import {setChipClassNames} from "@/app/api/v1/receipts/util/chipUtil";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";

interface ITableActions {
    handleRemove?: (idx: number) => void
}

interface Props {
    columns: string[]
    rows: Receipt[]
    actions?: ITableActions
}

const TableBuilder = ({columns, rows, actions}: Props) => {
    return (
        <Table>
            <TableHeader>
                {columns.map((column: string, idx: number) => (
                    <TableHead className="text-center" key={idx}>{column}</TableHead>
                ))}
            </TableHeader>
            <TableBody>
                {rows.map((receipt: Receipt, idx: number) => (
                    <TableRow key={idx}>
                        <TableCell className="text-center">{receipt.filename}</TableCell>
                        <TableCell className="text-center">{receipt.filetype}</TableCell>
                        <TableCell className="text-center">
                            <Badge className={setChipClassNames(receipt.status)}>{receipt.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableBuilder;