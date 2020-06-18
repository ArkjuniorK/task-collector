import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistanceState()],
  state: {
    teacher: {},
    student: {},
    tasks: [],
    task: {},
    students: [],
    class: {}
  },
  mutations: {
    SET_TEACHER(state, payload) {
      state.teacher = payload
    }
  },
  actions: {
    async setTeacher({ commit }, payload) {
      await commit('SET_TEACHER', payload)
    }
  },
  modules: {}
})
