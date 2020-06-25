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
    recents: [],
    pagination: {}
  },
  mutations: {
    SET_TEACHER(state, payload) {
      state.teacher = payload
    },
    SET_TASKS(state, payload) {
      state.tasks = payload
    },
    SET_RECENT_TASKS(state, payload) {
      state.recents = payload
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
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
      /* index tasks */
      const payloadIndex = await payload.tasks.map(item => {
        let tasksJson = {
          index: item.id,
          title: item.name,
          subject: item.subjectName,
          date: item.date,
          background: item.background
        }

        return tasksJson
      })

      /* recent tasks */
      const payloadRecents = await payload.recents.map(item => {
        const recentJson = {
          index: item.id,
          title: item.name,
          subject: item.subjectName,
          date: item.date
        }

        return recentJson
      })

      /* tasks pagination */
      const payloadPagination = await payload.pagination

      /* commit the instances */
      await commit('SET_TASKS', payloadIndex)
      await commit('SET_RECENT_TASKS', payloadRecents)
      await commit('SET_PAGINATION', payloadPagination)
    }
  },
  modules: {}
})
