import TaskServices from '../services/TaskServices'

let taskActions = {
  namespaced: true,
  actions: {
    async getTasks({ commit, rootState }) {
      // use rootState instead of state
      // because all the state outside
      // this module would be accesibble via rootState
      const tasksRes = await TaskServices.index(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        rootState.task.currentPage
      )

      const data = tasksRes.data
      let statePaginate = JSON.stringify(rootState.task.pagination)
      let dataPaginate = JSON.stringify(data.pagination)

      // Check pagination with the response
      // If same then return nothing
      if (statePaginate == dataPaginate) return

      // task/SET_DATA refer to theme module that registered on vuex
      commit('task/SET_DATA', data.tasks, { root: true })
      commit('task/SET_PAGINATION', data.pagination, { root: true })
    },
    async getTask({ commit, rootState }, payload) {
      const req = await TaskServices.get(
        {
          type: rootState.userType,
          idNumber: rootState.user.idNumber
        },
        payload
      )

      const data = req.data
      commit('task/SET_INFO', data, { root: true })
    }
  }
}

export default taskActions
