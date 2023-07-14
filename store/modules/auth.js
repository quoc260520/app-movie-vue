import { getToken } from "../../utils/auth.js"
import { getInfo, logout } from "../../service/auth.js"
export const state = () => ({
  token: getToken(),
  name: "",
  email: "",
  status: "",
  user: {},
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setName(state, name) {
    state.name = name
  },
  setEmail(state, email) {
    state.email = email
  },
  setStatus(state, status) {
    state.status = status
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const user = response?.data
          if (!user) {
            reject(new Error("Verification failed, please Login again."))
          }
          const { status, email, name } = user

          if (parseInt(status)) {
            reject(new Error("getInfo: roles must be a non-null array!"))
          }
          commit("setUser", user)
          commit("setStatus", status)
          commit("setEmail", email)
          commit("setName", name)
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((response) => {
          const user = response?.data
          if (!user) {
            reject(new Error("Verification failed, please Login again."))
          }
          commit("setUser", "")
          commit("setStatus", "")
          commit("setEmail", "")
          commit("setName", "")
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
