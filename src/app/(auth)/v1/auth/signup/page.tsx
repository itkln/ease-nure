import Button from "@/components/button/button";
import InputField from "@/components/input/input";
import Image from "next/image";
import Logo from "@/assets/images/easeLogo.svg";
import Link from "next/link";

const SignUp = () => {
    return (
        <>
            <div className="header text-center text-xl space-y-5">
                <Image className="inline" src={Logo} alt="Ease Logo"/>
                <h1 className="header-title font-semibold">Create Your Wallet</h1>
            </div>

            <form className="space-y-5">
                <InputField label="E-mail Address" type="text"/>
                <InputField label="Name" type="text"/>
                <Button title="Create" variant={"basic"}/>
            </form>

            <p className="text-sm text-center">Registering implies consent for personal data processing.</p>

            <div className="text-center">
                or{' '}
                <Link className="font-semibold" href="signin">
                    Login
                </Link>
            </div>
        </>
    )
}
export default SignUp;