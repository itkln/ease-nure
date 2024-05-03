"use client"

import React, {useState} from 'react';
import darkLogo from "@/assets/images/logo-dark.svg";
import lightLogo from "@/assets/images/logo-light.svg";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {ThemeModeToggle} from "@/components/ThemeModeToggle";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {useTheme} from "next-themes";
import dynamic from "next/dynamic";

const NoSSRImage = dynamic(() => import('next/image'), {
    ssr: false, // Disable server-side rendering
});

const Navbar = () => {
    return (
       <>
           <DesktopNavbar />
           <MobileNavbar />
       </>
    );
};

const links = [
    {label: "Receipts", link: "/api/v1/receipts"},
    {label: "Transactions", link: "/api/v1/transactions"},
    {label: "Manage", link: "/api/v1/manage"}
]


function NavbarLink({link, label}: { link: string, label: string }) {
    const pathname = usePathname()
    const isActive = pathname === link;

    return (
        <div className="relative flex items-center">
            <Link href={link} className={cn(
                buttonVariants({variant: "ghost"}),
                "w-full justify-start font-normal text-md text-muted-foreground",
                isActive && "text-foreground"
            )}>{label}</Link>
            {
                isActive && (
                    <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
                )
            }
        </div>
    );
}

const DesktopNavbar = () => {
    const { resolvedTheme } = useTheme()
    const logoSrc = resolvedTheme === 'light' ? lightLogo : darkLogo;

    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center px-8">
                <div className="flex h-[80px] min-h-[60px] items-center w-full justify-between">
                    <Image
                        className="hidden dark:block"
                        src={darkLogo}
                        alt="dark-mode-image"
                        width={120}
                    />
                    <Image
                        className="block dark:hidden"
                        src={lightLogo}
                        alt="light-mode-image"
                        width={120}
                    />
                    <div className="flex h-full">
                        {links.map(item => (
                            <NavbarLink key={item.label} link={item.link} label={item.label}></NavbarLink>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <ThemeModeToggle />
                    </div>
                </div>
            </nav>
        </div>
    )
}

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { resolvedTheme } = useTheme()
    const logoSrc = resolvedTheme === 'light' ? lightLogo : darkLogo;

    return <div className="block border-separate bg-background md:hidden">
        <nav className="container flex items-center justify-between py-3 px-8">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size="icon">
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:w-full" side="left">
                    <div className="flex flex-col gap-1 pt-4">
                        {links.map((link) => (
                            <NavbarLink key={link.label} link={link.link} label={link.label}/>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <Image
                className="hidden dark:block"
                src={darkLogo}
                alt="dark-mode-image"
                width={120}
            />
            <Image
                className="block dark:hidden"
                src={lightLogo}
                alt="light-mode-image"
                width={120}
            />
            <div className="flex items-center">
                <ThemeModeToggle/>
            </div>
        </nav>
    </div>
}

export default Navbar;