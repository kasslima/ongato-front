'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

export default function LoginForm(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);
            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Falha ao entrar. Verifique suas credenciais.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Entrar na sua conta</CardTitle>
                <CardDescription>
                    Use seu e-mail e senha para acessar o painel.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input name="email" id="email" type="email" placeholder="voce@email.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input name="password" id="password" type="password" placeholder="Digite sua senha" required />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
