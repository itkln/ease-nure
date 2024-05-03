import React, {ChangeEvent} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface Props {
    label: string
    name?: keyof ReceiptInfo
    type?: 'text' | 'email' | 'password' | 'textarea' | 'number'
    value?: string | number
    onChange: (field: keyof ReceiptInfo, value: string | number | Date) => void
    isReviewed: boolean
}

const LabelInput = ({label, type, name, value, onChange, isReviewed}: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Determining the right type to pass to onChange based on the input type
        const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
        onChange(name!, newValue);
    };

    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">{label}</Label>
            <Input className="outline-none"
                   onChange={handleChange}
                   value={value}
                   step="0.01"
                   min="1"
                   type={type}
                   readOnly={isReviewed}
                   id="email" placeholder={label}/>
        </div>
    )
}

export default LabelInput;