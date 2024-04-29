interface ReceiptFile {
    id: string
    filename: string
    filetype: string
    status: string
    content: ArrayBuffer
}

type Receipt = Omit<ReceiptFile, "content">;

interface Item {
    description: string;
    quantity: number;
    unit_price: string;
    total_price: number;
}

interface ReceiptInfo {
    store: string;
    category: string;
    country: string;
    city: string;
    address: string;
    total_amount: number;
    currency: string;
    datetime: Date;
    items: Item[];
}