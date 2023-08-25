import Vue from "vue"
import Vuex from "vuex"
import { NAME_TOKEN } from "../constants/index"
import getters from "./getters"

Vue.use(Vuex)

const requireModule = require.context("./modules", false, /\.js$/)
const modules = {}

requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, "")
  modules[moduleName] =
    requireModule(fileName).default || requireModule(fileName)
})

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req, app }) {
    if (req) {
      const cookies = req.headers.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=")
        acc[name] = value
        return acc
      }, {})
      const useToken = cookies[NAME_TOKEN]
      commit("setToken", useToken)
    }
  },
}

const createStore = () => {
  return new Vuex.Store({
    actions,
    modules,
    getters,
  })
}
export default createStore
