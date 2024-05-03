'use client'

import React from "react";
import {Loader2} from "lucide-react";
import TransactionTable from "@/app/api/v1/transactions/_components/TransactionTable";
import useGetAllTransactions from "@/app/api/v1/transactions/hooks/useGetAllTransactions";
import CategoryStats from "@/app/api/v1/transactions/_components/CategoryStatsProps";

const TranscationsPage = () => {
    const {transactions, isError, isLoading, error} = useGetAllTransactions()

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
        </div>
    );
    if (isError) return <span>Error: {error?.message}</span>;

    return (
        <div className="container flex flex-wrap items-center justify-between gap-5 py-3">
            {transactions &&
                <>
                    <CategoryStats transactions={transactions} />
                    <TransactionTable transactions={transactions} />
                </>
            }
        </div>
    );
}

export default TranscationsPage;
