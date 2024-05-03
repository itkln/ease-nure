import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface ReceiptStatusSelectorProps {
    receipts: ReceiptFile[]
}

function ReceiptStatusPicker({receipts}: ReceiptStatusSelectorProps) {
    // Assuming `props.receipts` is the array containing receipt objects with a `status` property
    const statusSet = new Set<String>(); // Creating a Set to hold unique statuses
    receipts.forEach(receipt => statusSet.add(receipt.status)); // Adding statuses to the Set
    const uniqueStatuses = Array.from<String>(statusSet); // Converting Set back to array

    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {uniqueStatuses.map((status, index) => (
                            <SelectItem value={status.toString()} key={index}>{status}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
        </Select>
    );
}

export default ReceiptStatusPicker;