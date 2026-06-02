import { login as localLogin, logout as localLogout } from "./auth";
import { getApiBaseUrl } from "./env";

const API_BASE_URL = getApiBaseUrl();
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
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await response.json();

  if (response.ok && data.result?.token) {
    localLogin(data.result.token);
    return data;
  }

  throw data;
}

export function logout() {
  fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  }).catch(() => {});
  localLogout();
}

export async function throwApiError(response: Response, defaultMessage: string): Promise<never> {
  let errorMsg = defaultMessage;
  try {
    const errData = await response.json();
    if (errData?.result && typeof errData.result === "object") {
      const fields = Object.keys(errData.result);
      const fieldErrors = fields
        .map(field => {
          const errors = errData.result[field];
          const errorList = Array.isArray(errors) ? errors.join(", ") : String(errors);
          return `${field}: ${errorList}`;
        })
        .join("; ");
      if (fieldErrors) {
        errorMsg = fieldErrors;
      }
    } else if (errData?.message) {
      errorMsg = errData.message;
    }
  } catch {}
  throw new Error(errorMsg);
}
