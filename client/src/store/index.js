import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      uid: null
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user.push(user)
    }
  },
  actions: {
    login({ commit }, user) {}
  },
  modules: {}
})
