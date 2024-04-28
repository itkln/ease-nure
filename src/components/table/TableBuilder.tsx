import {
    Button,
    Chip,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger, Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";

interface ITableActions {
    handleRemove?: (idx: number) => void
}

interface ITable {
    columns: string[]
    rows: Receipt[]
    actions?: ITableActions
}

import React from 'react';
import {DeleteOutline, MoreHorizRounded} from "@mui/icons-material";
import {setChipClassNames} from "@/app/api/v1/receipts/util/chipUtil";

const TableBuilder = (props: ITable) => {
    return (
        <Table removeWrapper radius="none" fullWidth shadow="none">
            <TableHeader>
                {props.columns.map((column: string, idx: number) => (
                    <TableColumn key={idx} align="center">{column}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {props.rows.map((receipt: Receipt, idx: number) => (
                    <TableRow key={idx}>
                        <TableCell>{receipt.filename}</TableCell>
                        <TableCell>{receipt.filetype}</TableCell>
                        <TableCell><Chip className={setChipClassNames(receipt.status)}>{receipt.status}</Chip></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableBuilder;