"use client"

import Button from "@/components/button/button";
import InputField from "@/components/input/input";
import Image from "next/image";
import Logo from "@/assets/images/easeLogo.svg";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent} from "react";
const SignIn = () => {

    const router = useRouter();
    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Perform authentication logic here

        // Example: check credentials, perform login
        // After successful authentication, redirect to the desired page

        router.push("verify") // /v1/auth/verify
    }

    return (
        <>
            <div className="header text-center text-xl space-y-5">
                <Image className="inline" src={Logo} alt="Ease Logo"/>
                <h1 className="header-title font-semibold">Wallet Authorization</h1>
            </div>

            <form className="space-y-8" onSubmit={handleSignIn}>
                <InputField label="E-mail Address" type="email"/>
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