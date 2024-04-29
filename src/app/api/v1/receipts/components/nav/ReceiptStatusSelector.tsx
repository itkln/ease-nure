import {Select, SelectItem} from "@nextui-org/react";

interface ReceiptStatusSelectorProps {
    receipts: ReceiptFile[]
}

function ReceiptStatusSelector({receipts}: ReceiptStatusSelectorProps) {
    // Assuming `props.receipts` is the array containing receipt objects with a `status` property
    const statusSet = new Set<String>(); // Creating a Set to hold unique statuses
    receipts.forEach(receipt => statusSet.add(receipt.status)); // Adding statuses to the Set
    const uniqueStatuses = Array.from<String>(statusSet); // Converting Set back to array

    return (
        <Select
            items={uniqueStatuses} // Now using uniqueStatuses array
            placeholder="All"
            className="max-w-xs"
            aria-label="Select status of receipt"
        >
            {uniqueStatuses.map((status, index) => (
                <SelectItem key={index}>{status}</SelectItem>
            ))}
        </Select>
    );
}

export default ReceiptStatusSelector;