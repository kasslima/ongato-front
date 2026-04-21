const AUTH_STORAGE_KEY = "ongato:isAuthenticated";
const AUTH_CHANGE_EVENT = "ongato:auth-change";

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
  dispatchAuthChangeEvent();
}

export function logout() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  dispatchAuthChangeEvent();
}

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
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
