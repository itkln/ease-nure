import {ChangeEvent} from "react";

interface InputField {
    label: string
    name?: keyof ReceiptInfo
    type?: 'text' | 'email' | 'password' | 'textarea' | 'number'
    value?: string | number
    onChange: (field: keyof ReceiptInfo, value: string | number | Date) => void
}

const InputField = ({label, type, name, value, onChange}: InputField) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Determining the right type to pass to onChange based on the input type
        const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
        onChange(name!, newValue);
    };

    return (
        <div className="input w-full flex space-x-3 items-center">
            <label className="block mb-[5px] w-[150px] text-sm">{label}</label>
            {type === "number" ?
                <input onChange={handleChange} step="0.01" min="1" value={value} type={type} name={name} required
                       className="w-full text-sm font-bold bg-[#fafafc] border py-[8px] px-4 rounded-[9px] outline-none focus:border-[#84868b] transition-colors ease-in duration-300"/>
                :
                <input onChange={handleChange} step="any" min="1" value={value} type={type} name={name} required
                       className="w-full text-sm font-bold bg-[#fafafc] border py-[8px] px-4 rounded-[9px] outline-none focus:border-[#84868b] transition-colors ease-in duration-300"/>}
        </div>
    )
}

export default InputField;