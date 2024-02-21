import Button from "@/components/button/button";
import InputField from "@/components/input/input";
import Image from "next/image";
import Logo from "@/assets/images/easeLogo.svg";
import Link from "next/link";

const SignIn = () => {
    return (
        <>
            <div className="header text-center text-xl space-y-5">
                <Image className="inline" src={Logo} alt="Ease Logo"/>
                <h1 className="header-title font-semibold">Wallet Authorization</h1>
            </div>

            <form className="space-y-8">
                <InputField label="E-mail Address" type="text"/>
                <Button title="Sign In" variant={"basic"}/>
            </form>

            <div className="text-center">
                Don’t have a wallet?{' '}
                <Link className="font-semibold" href="signup">
                    Create
                </Link>
            </div>
        </>
    )
}
export default SignIn;