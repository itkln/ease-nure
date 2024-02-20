import Button from "@/components/button/button";
import InputField from "@/components/input/input";
import Image from "next/image";
import Logo from "@/assets/images/easeLogo.svg";
import Link from "next/link";

const Verify = () => {
    return (
        <>
            <div className="header text-center text-xl space-y-5">
                <Image className="inline" src={Logo} alt="Ease Logo" />
                <h1 className="header-title font-semibold">Enter Verification Code</h1>
            </div>

            <p className="text-sm text-center">
                We sent a code to denysitkin@gmail.com.
                Please enter received code to continue
            </p>

            <Button title="Verify" variant={"basic"} />
        </>
    )
}
export default Verify;