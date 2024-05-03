import "./globals.css";
import localFont from 'next/font/local'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ReactQueryProvider from "@/components/react-query/ReactQueryProvider";
import RootProvider from "@/components/providers/RootProvider";

export const metadata = {
    title: 'Ease Wallet',
    description: 'Diploma work',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="bg-background">
        <RootProvider>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </RootProvider>
        </body>
        </html>
    )
}
