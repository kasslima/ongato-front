'use client'

import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage(){
    return (
    <>
    <div className="flex">
        <div className="w-1/2 bg-blue-200">
            Coluna 1
        </div>

        <div className="w-1/2 bg-green-200">
            <LoginForm/>
        </div>
        </div>
    </>
    )
}