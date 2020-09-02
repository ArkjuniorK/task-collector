import Vue from 'vue'
import Vuex from 'vuex'
/* import router from 'vue-router' */
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TaskServices from '../services/TaskServices'
import ThemeServices from '../services/ThemeServices'
import SubthemeServices from '../services/SubthemeServices'

Vue.use(Vuex)

/* TODO Create themes, subthemes, and tasks state with their own pagination */

export default new Vuex.Store({
  plugins: [
    /* Save state to localStorage */
    persistanceState({
      paths: ['user', 'userType', 'subjects', 'dataType']
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
    userType: null,
    user: {},
    dataType: 'theme',
    tasks: [],
    task: {},
    subthemes: [],
    subtheme: {},
    themes: [],
    theme: {},
    students: [],
    recents: [],
    taskpagination: {},
    themePagination: {},
    subthemePagination: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_USER_TYPE(state, payload) {
      state.userType = payload
    },
    SET_DATA_TYPE(state, payload) {
      state.dataType = payload
    },
    SET_THEMES(state, payload) {
      payload.forEach(theme => state.themes.push(theme))
    },
    SET_SUBTHEMES(state, payload) {
      state.subthemes = payload
    },
    SET_RECENT_TASKS(state, payload) {
      let recents = payload.map(val => val.task)
      state.recents = recents
    },
    SET_THEME_PAGINATION(state, payload) {
      state.themePagination = payload
    },
    SET_SUBTHEME_PAGINATION(state, payload) {
      state.subthemePagination = payload
    },
    SET_TASK_PAGINATION(state, payload) {
      state.taskPagination = payload
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

      state.user = object
      state.token = null
      state.data = array
      state.students = array
      state.pagination = object
      state.recents = array
      state.currentPage = 1
    }
  },
  actions: {
    /* Register actions */
    async registerUser({ commit }, payload) {},
    /* Login actions */
    async loginUser({ commit }, payload) {
      const authProcess = await AuthService.post(payload.type, {
        idNumber: payload.id,
        securityKey: payload.key
      })

      commit('SET_USER', authProcess.data.user)
      commit('SET_USER_TYPE', payload.type)
    },
    async logOutUser({ commit }) {
      commit('LOG_OUT')
    },
    /* Get themes */
    async getThemes({ state, commit }) {
      const themesRes = await ThemeServices.index(
        {
          type: state.userType,
          idNumber: state.user.idNumber
        },
        state.currentPage
      )

      const data = themesRes.data
      let statePaginate = JSON.stringify(state.themePagination)
      let dataPaginate = JSON.stringify(data.pagination)

      // Check pagination with the response
      // If same then return nothing
      if (statePaginate == dataPaginate) return

      commit('SET_THEMES', data.themes)
      commit('SET_THEME_PAGINATION', data.pagination)
    },
    /* Get subthemes */
    async getSubthemes({ state, commit }) {
      const subthemeRes = await SubthemeServices.index(
        {
          type: state.userType,
          idNumber: state.user.idNumber
        },
        state.currentPage
      )

      const data = subthemeRes.data
      /* Check if state.subthemes is same with the response */
      if (JSON.stringify(state.subthemes) == JSON.stringify(data.subthemes)) {
        return -1
      }

      commit('SET_SUBTHEMES', data.subthemes)
      commit('SET_SUBTHEME_PAGINATION', data.pagination)
    },
    /* Get recent task */
    async getRecentTasks({ state, commit }) {
      const recentTasks = await TaskServices.recent({
        type: state.userType,
        idNumber: state.user.idNumber
      })

      commit('SET_RECENT_TASKS', recentTasks.data)
    },
    /* old technique */
    async getTeacherTasks({ commit }, payload) {
      /* send the request tasks to server  */
      /* data intances from teacherTasks.data */
      /* new instances for each data */
      /* let tasks = await data.tasks
      let recents = await data.tasks.slice(0, 2)
      let pagination = await data.pagination

      [>commit the instances<]
      commit('SET_TASKS', tasks)
      commit('SET_PAGINATION', pagination) */
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
    /* Pagination */
    addCurrentPage({ commit }) {
      let one = 1
      commit('SET_CURRENT_PAGE', one)
    },
    refreshCurrentPage({ commit }) {
      let minOne = -1
      commit('SET_CURRENT_PAGE', minOne)
    }
  },
  modules: {}
})
