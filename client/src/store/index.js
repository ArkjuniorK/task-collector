import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TaskServices from '../services/TaskServices'
import TeacherServices from '../services/TeacherServices'
import StudentServices from '../services/StudentServices'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    /* only save the instance that defined in paths array */
    persistanceState({
      paths: ['teacher', 'student', 'token', 'subjects', 'dataType']
    })
  ],
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
    userType: 'teacher',
    dataType: 'theme',
    data: [],
    teacher: {},
    student: {},
    tasks: [],
    task: {},
    students: [],
    recents: [],
    pagination: {},
    token: null
  },
  mutations: {
    SET_TEACHER(state, payload) {
      state.teacher = payload
    },
    SET_STUDENT(state, payload) {
      state.student = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    /* TODO:
     * Refactor Task Mutation
     * Then add Theme and Subtheme Mutations*/
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

				problem with this was it doesn't update the list
      */

      // tasks.map(task => {
      // if (state.pagination.totalRecords === state.tasks.length) return
      // state.tasks.push(task)
      // })

      state.tasks = tasks
    },
    SET_RECENT_TASKS(state, payload) {
      /* define the recents array */
      /* 
      const recents = payload.map(task => {
        const recentObject = {
          index: task.id,
          date: recent.date,
          title: recent.name,
          subject: recent.subjectName
        }
        return recentObject
      }) */

      let recents = payload.map(val => val.task)
      console.log(recents)
      state.recents = recents
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
    },
    SET_CURRENT_PAGE(state, type) {
      if (type === 1) return state.currentPage++
      if (type === -1) return (state.currentPage = 1)
    },
    SET_TASK(state, payload) {
      state.task = payload
    },
    LOG_OUT(state) {
      let array = []
      let object = {}

      state.teacher = object
      state.student = object
      state.tasks = array
      state.students = array
      state.pagination = object
      state.recents = array
      state.currentPage = 1
    }
  },
  actions: {
    /* <-- auth --> */
    async registerTeacher({ commit }, payload) {
      /* register teacher and send the request data */
      const auth = await AuthService.teacherRegister(payload)

      /* commit auth data to 'SET_TEACHER' mutations */
      commit('SET_TEACHER', auth.data.teacher)
      commit('SET_TOKEN', auth.data.token)
    },
    async loginTeacher({ commit }, payload) {
      /* login teacher and it data that required */
      const auth = await AuthService.teacherLogin({
        idNumber: payload.id,
        securityKey: payload.key
      })

      /* commit auth data to 'SET_TEACHER' mutations */
      commit('SET_TEACHER', auth.data.teacher)
      commit('SET_TOKEN', auth.data.token)
    },
    async registerStudent({ commit }, payload) {
      /* register teacher and send the request data */
      const auth = await AuthService.studentRegister(payload)

      /* commit auth data to 'SET_TEACHER' mutations */
      commit('SET_STUDENT', auth.data.student)
      commit('SET_TOKEN', auth.data.token)
    },
    async loginStudent({ commit }, payload) {
      /* login teacher and it data that required */
      const auth = await AuthService.studentLogin({
        idNumber: payload.id,
        securityKey: payload.key
      })

      /* commit auth data to 'SET_TEACHER' mutations */
      commit('SET_STUDENT', auth.data.student)
      commit('SET_TOKEN', auth.data.token)
    },
    async logOutUser({ commit }) {
      commit('LOG_OUT')
    },

    /* <-- get --> */
    /* new technique */
    async getThemes({ commit }, payload) {
      const themesReq = 'hello'
    },
    async getRecentTasks({ state, commit }) {
      const recentTasks = await TaskServices.recent({
        type: state.userType,
        idNumber: state.teacher.idNumber
      })

      commit('SET_RECENT_TASKS', recentTasks.data)
    },
    /* old technique */
    async getTeacherTasks({ commit }, payload) {
      /* send the request tasks to server  */
      const teacherTasks = await TeacherServices.teacherTasks({
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
      commit('SET_TASKS', tasks)
      commit('SET_PAGINATION', pagination)
    },
    async getStudentTasks({ commit }, payload) {
      const studentTasks = await StudentServices.teacherTasks({
        idNumber: payload.idNumber,
        page: payload.page
      })

      /* data intances from teacherTasks.data */
      let data = await studentTasks.data

      /* new instances for each data */
      let tasks = await data.tasks
      let recents = await data.tasks.slice(0, 2)
      let pagination = await data.pagination

      /* commit the instances */
      commit('SET_TASKS', tasks)
      commit('SET_RECENT_TASKS', recents)
      commit('SET_PAGINATION', pagination)
    },
    async getTask({ commit }, payload) {
      /* task request to server */
      const task = await TaskServices.index(payload)

      /* commit the task data into task object */
      commit('SET_TASK', task.data)
    },

    /* <-- set --> */
    async postTask({ state, getters }, payload) {
      await TaskServices.post({
        name: payload.name,
        background: payload.background,
        subjectName: payload.subject,
        date: payload.date,
        questions: payload.questions,
        references: payload.references,
        roomIdNumber: getters.teacherClass.idNumber,
        teacherIdNumber: state.teacher.idNumber,
        schoolIdNumber: state.teacher.schoolIdNumber
      })
    },
    addCurrentPage({ commit }) {
      let add = 1
      commit('SET_CURRENT_PAGE', add)
    },
    refreshCurrentPage({ commit }) {
      let refresh = -1
      commit('SET_CURRENT_PAGE', refresh)
    }
  },
  getters: {
    teacherClass: state => {
      return state.teacher.class[0]
    }
  },
  modules: {}
})
