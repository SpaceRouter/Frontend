import Cookies from "universal-cookie";

export function setCookie(name, value) {
  const cookie = new Cookies();
  cookie.set(name, value, { path: "/", sameSite: "lax" });
}

export function getCookie(name) {
  const cookie = new Cookies();
  return cookie.get(name);
}

export function removeCookie(name) {
    const cookie = new Cookies();
    cookie.remove(name);
}