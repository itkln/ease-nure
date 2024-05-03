import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Progress} from "@/components/ui/progress";

interface CategoryStatsProps {
    transactions: TransactionType[];
}

interface CategoryCardProps {
    currency: string;
    categories: TransactionType[];
}

const CategoryStats = ({transactions}: CategoryStatsProps) => {
    const uniqueCurrencies: string[] = Array.from(new Set(transactions.map(transaction => transaction.currency)));

    return (
        <div className="flex flex-wrap w-full gap-3 md:flex-nowrap">
            {uniqueCurrencies.map(currency => (
                <CategoryCard key={currency} currency={currency}
                              categories={transactions.filter(transaction => transaction.currency === currency)}/>
            ))}
        </div>
    );
};

const CategoryCard = ({currency, categories}: CategoryCardProps) => {
    const totalAmounts: { [category: string]: number } = {};

    categories.forEach(category => {
        const amount = parseFloat(category.total_amount);
        if (!isNaN(amount)) {
            totalAmounts[category.category] = (totalAmounts[category.category] || 0) + amount;
        }
    });

    const total = Object.values(totalAmounts).reduce((acc, val) => acc + val, 0);

    return (
        <Card className="w-full col-span-6">
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
                    <span className="text-muted-foreground text-xl">Transactions by category</span><h1
                    className="font-medium">{currency}</h1>
                </CardTitle>
            </CardHeader>

            <ScrollArea className="w-full px-4">
                <div className="flex w-full flex-col gap-3 px-4 py-6">
                    {Object.entries(totalAmounts).map(([category, amount]) => {
                        const percentage = (amount * 100) / (total || amount);
                        return (
                            <div key={category} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-muted-foreground">
                                        {category}
                                        <span className="ml-2 text-xs text-muted-foreground">
                                            ({percentage.toFixed(0)}%)
                                        </span>
                                    </span>
                                    <span className="text-sm">
                                        {amount.toFixed(2)}
                                    </span>
                                </div>
                                <Progress
                                    value={percentage}
                                />
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </Card>
    );
};
export default CategoryStats;
