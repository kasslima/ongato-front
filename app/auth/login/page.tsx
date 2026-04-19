'use client'

import Image from "next/image"
import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage(){
    return (
        <main className="grid min-h-screen md:grid-cols-2">
            

            <section className="flex min-h-screen items-center justify-center bg-[#f5f1e8] p-6 md:min-h-0 md:p-10">
                <LoginForm />
            </section>

            <section className="relative hidden overflow-hidden bg-neutral-900 md:block">
                <Image
                    src="/login-side.jpeg"
                    alt="Foto da tela de login"
                    fill
                    priority
                    className="object-cover"
                />
            </section>
        </main>
    )
}