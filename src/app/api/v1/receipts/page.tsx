'use client'

import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, NavbarMenu, NavbarMenuItem,
    NavbarMenuToggle,
    NextUIProvider,
    Spinner
} from "@nextui-org/react";
import ReceiptControl from "@/app/api/v1/receipts/components/control/ReceiptControl";
import ReceiptNav from "@/app/api/v1/receipts/components/nav/ReceiptNav";
import ReceiptView from "@/app/api/v1/receipts/components/view/ReceiptView";
import Image from "next/image";
import easeLogo from "@/assets/images/easeLedger.svg";
import Link from "next/link";
import FileUploadModal from "@/app/api/v1/components/modal/FileUploadModal";
import {useState} from "react";
import useGetAllReceipts from "@/app/api/v1/receipts/hooks/useGetAllReceipts";
import {ReceiptLongRounded} from "@mui/icons-material";

const Receipts = () => {
    const [isUploadOpen, setUploadOpen] = useState<boolean>(false);
    const [receiptView, setReceiptView] = useState<ReceiptFile | undefined>();
    const {isLoading, data, isError, error } = useGetAllReceipts();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showReceiptNav, setShowReceiptNav] = useState(false);

    // Toggle function
    const toggleReceiptNav = () => {
        setShowReceiptNav(!showReceiptNav);
    };

    const menuItems = [
        "Overview",
        "Statistics",
    ];

    if (isLoading) return (
        <div className="h-screen flex items-center justify-center">
            <span><Spinner/></span>
        </div>
    );
    if (isError) return <span>Error: {error?.message}</span>;

    const onReceiptShow = (fileId: string) => {
        // If no receipt is found, receipt will automatically be undefined
        const receipt = data?.find(receipt => receipt.id === fileId);
        setReceiptView(receipt);
    };

    const onReceiptNavShow = () => {
        setShowReceiptNav(false);
    };

    return (
        <NextUIProvider>
            <header className="dark text-foreground bg-background">
                <Navbar
                    position="static"
                    className="bg-[#0E1218]"
                    isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}
                    maxWidth={"full"}
                >
                    <NavbarContent className="md:hidden" justify="start">
                        <NavbarMenuToggle/>
                    </NavbarContent>

                    <NavbarContent className="md:hidden pr-3" justify="center">
                        <NavbarBrand>
                            <Image src={easeLogo} alt="Ease Logo"/>
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent className="hidden md:flex gap-12" justify="center">
                        <NavbarBrand>
                            <Image src={easeLogo} alt="Ease Logo"/>
                        </NavbarBrand>
                        <NavbarItem>
                            <Link className="text-sm hover:opacity-70 transition duration-200" color="foreground" href="/api/v1/receipts">
                                Receipts
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link className="text-sm hover:opacity-70 transition duration-200" href="/api/v1/transactions">
                                Statistics
                            </Link>
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button size="lg" className="bg-white bg-opacity-15" variant="flat" onClick={() => setUploadOpen(true)}>New Expense</Button>
                        </NavbarItem>
                    </NavbarContent>

                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    className="w-full"
                                    href="#"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>
            </header>
            <main>
                <div className="receipts-info bg-white flex justify-between py-3 px-6 border-solid border-b-2">
                    <Button className="bg-[#0E1218] dark text-foreground sm:w-full md:w-fit"
                            onClick={toggleReceiptNav} startContent={<ReceiptLongRounded className="opacity-90"/>}>
                        Files
                    </Button>
                </div>
                <div className="receipts-main relative top-0 w-full h-screen flex flex-col lg:flex-row lg:flex-nowrap">
                    {showReceiptNav && <ReceiptNav onReceiptShow={onReceiptShow} onReceiptNavShow={onReceiptNavShow}
                                                   receipts={data || []}/>}
                    <ReceiptView receipt={receiptView}/>
                    {receiptView && <ReceiptControl receipt={receiptView}/>}
                </div>
                <FileUploadModal isOpen={isUploadOpen} onClose={() => setUploadOpen(false)}/>
            </main>
        </NextUIProvider>
    );
}

export default Receipts;
