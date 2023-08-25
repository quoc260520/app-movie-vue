import request from "./index.js"

export function orderTicket(data) {
    return request("/order-movie", {
        method: "POST",
        data
    })
}

export function orderByUser() {
    return request("/order-movie/me", {
        method: "GET",
    })
}