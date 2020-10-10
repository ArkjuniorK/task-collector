import SubthemeServices from '../services/SubthemeServices'
import ThemeServices from '../services/ThemeServices'

let subthemeActions = {
  namespaced: true,
  actions: {
    async getSubthemes({ commit, rootState }) {
      // use rootState instead of state
      const subthemeRes = await SubthemeServices.index(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        rootState.subtheme.currentPage
      )

      const data = subthemeRes.data
      let statePaginate = JSON.stringify(rootState.subtheme.pagination)
      let dataPaginate = JSON.stringify(data.pagination)

      // Check pagination with the response
      // If same then return nothing
      if (statePaginate == dataPaginate) return

      // subtheme/SET_DATA refer to theme module that registered on vuex
      commit('subtheme/SET_DATA', data.subthemes, { root: true })
      commit('subtheme/SET_PAGINATION', data.pagination, { root: true })
    },
    async getSubtheme({ commit, rootState }, payload) {
      const req = await SubthemeServices.get(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        payload
      )

      const data = req.data
      commit('subtheme/SET_INFO', data, { root: true })
    },
    async postSubtheme({ rootState }, payload) {
      try {
        await SubthemeServices.post(rootState.user.idNumber, payload)
      } catch (e) {
        console.log(e)
      }
    },
    async listThemes({ commit, rootState }) {
      try {
        const req = await ThemeServices.list(rootState.user.idNumber)
        const data = req.data
        // console.log(data)
        commit('subtheme/SET_LIST', data, { root: true })
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default subthemeActions
