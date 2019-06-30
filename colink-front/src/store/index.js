import Vue from 'vue'
import Vuex from 'vuex'
import links from './modules/links'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    links: links
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
