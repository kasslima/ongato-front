import { getAuthCookieSecret } from "@/lib/env";

const AUTH_COOKIE_NAME = "ongato_session";
const SESSION_DURATION_SECONDS = 30 * 60; // 30 minutes

function toBase64Url(bytes: Uint8Array) {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf-8");
}

function timingSafeEqualString(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return diff === 0;
}

async function sign(value: string) {
  const secret = getAuthCookieSecret();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(signature));
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}

export function getSessionDurationSeconds() {
  return SESSION_DURATION_SECONDS;
}

export async function createSessionCookieValue(token: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const tokenEncoded = toBase64Url(new TextEncoder().encode(token));
  const payload = `${tokenEncoded}.${expiresAt}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionCookieValue(cookieValue: string) {
  const [tokenEncoded, expiresAtRaw, signature] = cookieValue.split(".");
  if (!tokenEncoded || !expiresAtRaw || !signature) {
    return null;
  }

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return null;
  }

  const payload = `${tokenEncoded}.${expiresAt}`;
  const expectedSignature = await sign(payload);
  if (!timingSafeEqualString(signature, expectedSignature)) {
    return null;
  }

  try {
    const token = fromBase64Url(tokenEncoded);
    if (!token) {
      return null;
    }
    return { token, expiresAt };
  } catch {
    return null;
  }
}
