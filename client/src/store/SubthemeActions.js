import SubthemeServices from '../services/SubthemeServices'

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
    }
  }
}

export default subthemeActions
