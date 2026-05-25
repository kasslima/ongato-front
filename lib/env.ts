export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL
}

export function getAuthCookieSecret() {
  const secret = process.env.AUTH_COOKIE_SECRET;
  if (!secret) {
    throw new Error("AUTH_COOKIE_SECRET is not configured");
  }
  return secret;
}
