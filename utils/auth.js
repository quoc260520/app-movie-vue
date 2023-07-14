import Cookies from "js-cookie"

const nameToken = "movieAccessToken"

export function getToken() {
  return Cookies.get(nameToken)
}

export function setToken(token) {
  return Cookies.set(nameToken, token)
}

export function removeToken() {
  return Cookies.remove(nameToken)
}
