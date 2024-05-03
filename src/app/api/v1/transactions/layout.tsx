"use client"

import React, {ReactNode, useState} from 'react';
import Navbar from "@/components/Navbar";
import {Button} from "@/components/ui/button";
import FileUploadDialog from "@/components/FileUploadDialog";

const Layout = ({children}: {children: ReactNode}) => {
    const [isUploadOpen, setUploadOpen] = useState<boolean>(false);
    return (
        <div className="relative flex h-screen w-full flex-col">
            <Navbar></Navbar>
            <div className="border-separate border-b bg-card">
                <div className="container receipts-info flex justify-between items-center py-3">
                    <h1 className="text-xl md:text-3xl font-bold text-foreground">Hi, Denis! 👋</h1>
                    <Button onClick={() => setUploadOpen(true)} variant="outline"
                            className="border-rose-700 bg-destructive text-destructive-foreground hover:bg-rose-700 hover:text-white">New
                        expense</Button>
                    <FileUploadDialog isOpen={isUploadOpen} onClose={() => setUploadOpen(false)}/>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default Layout;