import request from "./index.js"

export function apply(data) {
    return request("/apply-coupon", {
        method: "POST",
        data,
    })
}
