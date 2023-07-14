import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"

Vue.use(Vuex)

const requireModule = require.context("./modules", false, /\.js$/)
const modules = {}

requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, "")
  modules[moduleName] =
    requireModule(fileName).default || requireModule(fileName)
})

const createStore = () => {
    return new Vuex.Store({
        modules,
        getters,
    })
}
export default createStore
