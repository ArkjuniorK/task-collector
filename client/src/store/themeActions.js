import ThemeServices from '../services/ThemeServices'

let themeActions = {
  namespaced: true,
  actions: {
    async getThemes({ state, commit, rootState }) {
      // use rootState instead of state
      // because all the state outside
      // this module would be accesibble via rootStatetate
      const themesRes = await ThemeServices.index(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        state.currentPage
      )

      // receive the data
      // turn JSON into String
      const sPage = state.pagination
      const data = themesRes.data
      let statePaginate = JSON.stringify(sPage)
      let dataPaginate = JSON.stringify(data.pagination)

      // Check pagination with the response
      // If same then return nothing
      if (statePaginate === dataPaginate) return

      // theme/SET_DATA refer to theme module that registered on vuex
      commit('theme/SET_DATA', data.themes, { root: true })
      commit('theme/SET_PAGINATION', data.pagination, { root: true })
    },
    async getTheme({ commit, rootState }, payload) {
      try {
        const res = await ThemeServices.get(
          {
            type: rootState.userType,
            idNumber: rootState.user.idNumber
          },
          payload
        )

        const data = res.data
        commit('theme/SET_INFO', data, { root: true })
      } catch (e) {
        const error = err.response.data
        commit('SET_RESPONSE', error, { root: true })
      }
    },
    async postTheme({ commit, rootState }, payload) {
      try {
        const req = await ThemeServices.post(rootState.user.idNumber, payload)
        const theme = req.data.theme
        const success = req.data

        commit('theme/SET_INFO', theme, { root: true })
        commit('SET_RESPONSE', success, { root: true })
      } catch (err) {
        const error = err.response.data
        commit('SET_RESPONSE', error, { root: true })
      }
    },
    async deleteTheme({ commit, rootState }, payload) {
      try {
        const req = await ThemeServices.delete(rootState.user.idNumber, payload)
        const success = req.data

        commit('SET_RESPONSE', success, { root: true })
      } catch (err) {
        const error = err.response.data
        commit('SET_RESPONSE', error, { root: true })
      }
    }
  }
}

export default themeActions
