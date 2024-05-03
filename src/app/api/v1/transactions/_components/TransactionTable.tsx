import React from 'react';
import {ColumnDef,} from "@tanstack/react-table"
import {DataTable} from "@/components/ui/data-table";

const columns: ColumnDef<TransactionType>[] = [
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "store",
        header: "Store",
    },
    {
        accessorKey: "created_at",
        header: "Approved",
        cell: ({ row }) => {
            const date = new Date(row.original.created_at);
            const formattedDate = date.toLocaleDateString("default", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            });
            return <div className="text-muted-foreground">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "total_amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = row.original.total_amount;
            const currency = row.original.currency;
            return <div className="text-muted-foreground font-bold">{currency} {" "} {amount}</div>;
        },
    }
];

interface Props {
    transactions: TransactionType[]
}

const TransactionTable = ({transactions}: Props) => {
    return (
        <div className="w-full h-screen">
            <DataTable columns={columns} data={transactions}/>
        </div>
    );
};

export default TransactionTable;