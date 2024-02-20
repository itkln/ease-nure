import localFont from "next/font/local"
import type { PropsWithChildren } from "react"

export const metadata = {
  title: 'Ease Wallet Auth',
  description: 'Authentication',
}

export default function AuthLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <main className="mx-auto max-w-[498px] h-screen flex justify-center items-center max-[640px]:mx-5">
      <div className="bg-white p-10 rounded-2xl w-full space-y-5">
        {children}
      </div>
    </main>
  )
}
