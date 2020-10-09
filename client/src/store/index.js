import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TaskServices from '../services/TaskServices'

import data from './data'
import themeActions from './ThemeActions'
import subthemeActions from './SubthemeActions'
import taskActions from './TaskActions'

//  🔥🔥 Merge two object using spread object 🔥
const theme = { ...data, ...themeActions }
const subtheme = { ...data, ...subthemeActions }
const task = { ...data, ...taskActions }

Vue.use(Vuex)

/* TODO Create themes, subthemes, and tasks state with their own pagination DONE  */
/* TODO Create modules for each data DONE */

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
    userType: null,
    user: {},
    recents: []
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_USER_TYPE(state, payload) {
      state.userType = payload
    },
    SET_RECENT_TASKS(state, payload) {
      state.recents = payload.map(v => v.task)
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
    // Register User
    async registerUser({ commit }, payload) {},
    // Login User
    async loginUser({ commit }, payload) {
      const auth = await AuthService.post(payload.type, {
        idNumber: payload.id,
        securityKey: payload.key
      })

      commit('SET_USER', auth.data.user)
      commit('SET_USER_TYPE', payload.type)
    },
    async logOutUser({ commit }) {
      commit('LOG_OUT')
      router.push('/login')
    },
    // Recent Tasks
    async getRecentTasks({ state, commit }) {
      const recentTasks = await TaskServices.recent({
        type: state.userType,
        idNumber: state.user.idNumber
      })

      commit('SET_RECENT_TASKS', recentTasks.data)
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
    }
  },
  modules: {
    theme,
    subtheme,
    task
  }
})
