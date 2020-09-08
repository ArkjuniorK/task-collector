import Vue from 'vue'
import Vuex from 'vuex'
import persistanceState from 'vuex-persistedstate'

import AuthService from '../services/AuthServices'
import TaskServices from '../services/TaskServices'
import SubthemeServices from '../services/SubthemeServices'

import data from './data'
import themeActions from './themeActions'
import subthemeActions from './subthemeActions'

// 🔥🔥 Merge two object 🔥🔥
const theme = { ...data, ...themeActions }
const subtheme = { ...data, ...subthemeActions }

Vue.use(Vuex)

/* TODO Create themes, subthemes, and tasks state with their own pagination */
/* TODO Create modules for each data */

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
    dataType: 'theme',
    tasks: [],
    task: {},
    students: [],
    recents: [],
    pagination: []
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
    SET_RECENT_TASKS(state, payload) {
      let recents = payload.map(val => val.task)
      state.recents = recents
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
    /* Get recent task */
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
    subtheme
  }
})
