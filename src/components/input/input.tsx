interface InputField {
    label: string
    name?: string
    type?: 'text' | 'email' | 'password' | 'textarea'
}

const InputField = ({label, type, name}: InputField) => {
    return (
        <div className="input">
            <label htmlFor="email" className="block mb-[5px] text-sm">{label}</label>
            <input type={type} name={name} required className="w-full border border-[#E2E3E6] py-[10px] px-4 rounded-[9px] outline-none focus:border-[#84868b] transition-colors ease-in duration-300" />
        </div>
    )
}

export default InputField;