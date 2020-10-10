/* 😄 REUSABLE STATE AND MUTATION 🔥 */
import _ from 'lodash'

let data = {
  namespaced: true,
  state: () => ({
    currentPage: 1,
    data: [],
    list: [],
    info: {},
    pagination: {}
  }),
  mutations: {
    SET_CURRENT_PAGE(state, payload) {
      if (payload == 1) state.currentPage++
      else state.currentPage = 1
    },
    SET_DATA(state, payload) {
      payload.forEach(val => state.data.push(val))
    },
    SET_LIST(state, payload) {
      state.list = payload
    },
    SET_INFO(state, payload) {
      state.info = payload
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
    },
    RESET_DATA(state) {
      state.data = []
    }
  }
}

export default data
