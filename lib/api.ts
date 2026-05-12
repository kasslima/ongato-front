import { login as localLogin, logout as localLogout } from "./auth";

const API_BASE_URL = "https://ongato-serverless.lucasribeiro292004.workers.dev";
const TOKEN_KEY = "ongato:token";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localLogout();
    }
  }

  return response;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok && data.result?.token) {
    localLogin(data.result.token);
    return data;
  }

  throw data;
}

export function logout() {
  localLogout();
}
