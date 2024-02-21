'use client'
import React, {useEffect, useRef, useState} from "react";
import Button from "@/components/button/button";

// interface OtpFormProps {
//     onSubmit: () => void
// }

const OtpForm = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input
            if (value !== '' && index < otp.length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        // Focus on the first input when the page loads
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <form className="space-y-8">
            <div className="flex justify-around">
                {
                    otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(ref) => (inputRefs.current[i] = ref)}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="border-b-2 w-[60px] h-[70px] text-center outline-none focus:border-[#84868b] transition-colors ease-in duration-200"
                            type="text"
                            maxLength={1}
                        />
                    ))
                }
            </div>
            <Button title="Verify" variant={"basic"}/>
        </form>
    )
}

export default OtpForm;