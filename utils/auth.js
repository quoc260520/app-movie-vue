import Cookies from "js-cookie"
import { NAME_TOKEN } from "../constants/index"

export function getToken() {
  return Cookies.get(NAME_TOKEN)
}

export function setToken(token) {
  return Cookies.set(NAME_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(NAME_TOKEN)
}
