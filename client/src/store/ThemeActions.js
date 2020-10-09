import ThemeServices from '../services/ThemeServices'

let themeActions = {
  namespaced: true,
  actions: {
    async getThemes({ commit, rootState }) {
      // use rootState instead of state
      // because all the state outside
      // this module would be accesibble via rootStatetate
      const themesRes = await ThemeServices.index(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        rootState.theme.currentPage
      )

      const data = themesRes.data
      let statePaginate = JSON.stringify(rootState.theme.pagination)
      let dataPaginate = JSON.stringify(data.pagination)

      // Check pagination with the response
      // If same then return nothing
      if (statePaginate == dataPaginate) return

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
        console.log(e)
      }
    },
    async postTheme({ rootState }, payload) {
      try {
        await ThemeServices.post(rootState.user.idNumber, payload)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default themeActions
