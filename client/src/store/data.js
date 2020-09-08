/* 😄 REUSABLE STATE AND MUTATION 🔥 */

let data = {
  namespaced: true,
  state: () => ({
    currentPage: 1,
    data: [],
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
    SET_INFO(state, payload) {
      state.info = payload
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
    }
  }
}

export default data
