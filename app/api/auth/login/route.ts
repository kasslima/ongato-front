import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/env";
import {
  createSessionCookieValue,
  getAuthCookieName,
  getSessionDurationSeconds,
} from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    console.log(getApiBaseUrl())

    const upstreamResponse = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await upstreamResponse.json();
    const token = data?.result?.token;

    if (!upstreamResponse.ok || !token) {
      return NextResponse.json(
        { message: data?.message ?? "Credenciais inválidas." },
        { status: upstreamResponse.status || 401 },
      );
    }

    const sessionValue = await createSessionCookieValue(token);
    const response = NextResponse.json({
      ok: true,
      message: "Login realizado com sucesso.",
      result: { token },
    });

    response.cookies.set({
      name: getAuthCookieName(),
      value: sessionValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getSessionDurationSeconds(),
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Erro ao processar login." }, { status: 500 });
  }
}
