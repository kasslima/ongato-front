const AUTH_STORAGE_KEY = "ongato:isAuthenticated";
const AUTH_CHANGE_EVENT = "ongato:auth-change";
const AUTH_COOKIE_KEY = "ongato_auth";

function setAuthCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=true; path=/; max-age=604800; samesite=lax`;
}

function clearAuthCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}

function dispatchAuthChangeEvent() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function login() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, "true");
  setAuthCookie();
  dispatchAuthChangeEvent();
}

export function logout() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearAuthCookie();
  dispatchAuthChangeEvent();
}

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  const localAuth = localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  const cookieAuth = document.cookie.includes(`${AUTH_COOKIE_KEY}=true`);

  return localAuth || cookieAuth;
}

export function subscribeAuthChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

export function getAuthServerSnapshot() {
  return false;
}
