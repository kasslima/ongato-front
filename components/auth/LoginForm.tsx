'use client'

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

export default function LoginForm(){
    return (
        <Card>
            <CardHeader>
                <CardTitle>Entrar na sua conta</CardTitle>
                <CardDescription>
                    Use seu e-mail e senha para acessar o painel.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="voce@email.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" placeholder="Digite sua senha" required />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                        Entrar
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}