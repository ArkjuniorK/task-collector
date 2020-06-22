import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TeacherService from '../services/TeacherServices'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistanceState()],
  state: {
    teacher: {},
    student: {},
    tasks: [],
    task: {},
    students: [],
    class: {},
    recentTasks: []
  },
  mutations: {
    SET_TEACHER(state, payload) {
      state.teacher = payload
    },
    SET_TASKS(state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    /* auth */
    async loginTeacher({ dispatch }, payload) {
      const auth = await AuthService.teacherLogin({
        idNumber: payload.id,
        securityKey: payload.key
      })
      await dispatch('setTeacher', auth.data)
    },
    /* get */
    async getTeacherTasks({ dispatch }, payload) {
      const teacherTasks = await TeacherService.teacherTasks({
        idNumber: payload.idNumber,
        page: payload.page
      })
      await dispatch('setTasks', teacherTasks.data)
    },
    /* set */
    async setTeacher({ commit }, payload) {
      await commit('SET_TEACHER', payload)
    },
    async setTasks({ commit }, payload) {
      const payloadTasks = await payload.tasks.map(val => {
        let tasksJson = {
          index: val.id,
          title: val.name,
          subject: val.subjectName,
          date: val.updatedAt,
          background: val.background
        }

        return tasksJson
      })
      console.log(payloadTasks)
      await commit('SET_TASKS', payloadTasks)
    }
  },
  modules: {}
})
