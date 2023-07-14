import request from "./index.js"

export function login(data) {
  return request("/auth/login", {
    method: "POST",
    data,
  })
}

export function getInfo() {
  return request("/auth/me", {
    method: "GET",
  })
}

export function logout() {
  return request("/auth/me", {
    method: "GET",
  })
}
