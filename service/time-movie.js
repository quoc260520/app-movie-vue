import request from "./index.js"

export function getOrderByTimeId(timeId) {
    return request(`/time-movie/${timeId}`, {
        method: "GET",
    })
}
