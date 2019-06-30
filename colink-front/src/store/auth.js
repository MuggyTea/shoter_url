/**
 * ログイン済みユーザーを管理するストア
 */

const state = {
  user: null
}

const getters = {}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  async register (context, data) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
