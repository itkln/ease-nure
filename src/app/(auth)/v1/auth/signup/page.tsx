"use client"

import Button from "@/components/button/button";
import LabelInput from "@/components/LabelInput";
import Image from "next/image";
import Logo from "@/assets/images/easeLogo.svg";
import Link from "next/link";
import {FormEvent} from "react";
import {useRouter} from "next/navigation";

const SignUp = () => {

    const router = useRouter()

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
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
                <h1 className="header-title font-semibold">Create Your Wallet</h1>
            </div>

            <form className="space-y-5" onSubmit={handleSignUp}>
                <LabelInput label="E-mail Address" type="email"/>
                <LabelInput label="Name" type="text"/>
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