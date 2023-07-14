import request from "./index.js"

export function getAllMovie(params) {
  return request("/movie", {
    method: "GET",
    params,
  })
}
export function getMovieById(id) {
  return request(`/movie/${id}`, {
    method: "GET",
  })
}

export function getTimeByMovie(id, params) {
  return request(`/movie-time/${id}`, {
    method: "GET",
    params,
  })
}
