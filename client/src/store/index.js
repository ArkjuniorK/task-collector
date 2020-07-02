import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TeacherService from '../services/TeacherServices'
import TaskServices from '../services/TaskServices'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistanceState()],
  state: {
    subjects: [
      'Bahasa Indonesia',
      'Matematika',
      'PKN',
      'Pendidikan Agama',
      'Penjaskes',
      'Seni Budaya'
    ],
    currentPage: 1,
    teacher: {},
    student: {},
    tasks: [],
    task: {},
    students: [],
    recents: [],
    pagination: {}
  },
  mutations: {
    SET_TEACHER(state, payload) {
      state.teacher = payload
    },
    SET_TASKS(state, payload) {
      /* defina new tasks array */
      const tasks = payload.map(task => {
        const taskObject = {
          index: task.id,
          date: task.date,
          title: task.name,
          subject: task.subjectName,
          background: task.background
        }
        return taskObject
      })

      /* 
        - push the tasks item into state.tasks 
        - if the total item equal to state.tasks length return nothing
      */
      tasks.map(task => {
        if (state.pagination.totalRecords === state.tasks.length) return
        state.tasks.push(task)
      })
    },
    SET_RECENT_TASKS(state, payload) {
      /* define the recents array */
      const recents = payload.map(recent => {
        const recentObject = {
          index: recent.id,
          date: recent.date,
          title: recent.name,
          subject: recent.subjectName
        }
        return recentObject
      })

      /* if the recents length equal to 2 return nothing */
      if (state.recents.length === 2) return
      state.recents = recents
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
    },
    SET_CURRENT_PAGE(state) {
      state.currentPage++
    },
    SET_TASK(state, payload) {
      state.task = payload
    }
  },
  actions: {
    /* <-- auth --> */
    async loginTeacher({ commit }, payload) {
      /* auth teacher and it data that required */
      const auth = await AuthService.teacherLogin({
        idNumber: payload.id,
        securityKey: payload.key
      })

      /* commit auth data to 'SET_TEACHER' mutations */
      commit('SET_TEACHER', auth.data)
    },

    /* <-- get --> */
    async getTeacherTasks({ commit }, payload) {
      /* send the request tasks to server  */
      const teacherTasks = await TeacherService.teacherTasks({
        idNumber: payload.idNumber,
        page: payload.page
      })

      /* data intances from teacherTasks.data */
      let data = await teacherTasks.data

      /* new instances for each data */
      let tasks = await data.tasks
      let recents = await data.tasks.slice(0, 2)
      let pagination = await data.pagination

      /* commit the instances */
      commit('SET_TASK', tasks)
      commit('SET_RECENT_TASKS', recents)
      commit('SET_PAGINATION', pagination)
    },

    /* <-- set --> */
    async postTask({ state, getters }, payload) {
      const task = await TaskServices.addTask({
        name: payload.name,
        subjectName: payload.subject,
        date: payload.date,
        questions: payload.questions,
        refences: payload.refences,
        roomIdNumber: getters.teacherClass.idNumber,
        teacherIdNumber: state.teacher.idNumber,
        schoolIdNumber: state.teacher.schoolIdNumber
      })

      console.log(task)
    },
    async setCurrentPage({ commit }) {
      commit('SET_CURRENT_PAGE')
    }
  },
  getters: {
    teacherClass: state => {
      return state.teacher.class[0]
    }
  },
  modules: {}
})
