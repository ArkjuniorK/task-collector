import Api from './Api'

export default {
  // Get Tasks
  index({ type, idNumber }, page) {
    return Api().get(`task/${type}/${idNumber}`, {
      params: {
        page: page
      }
    })
  },
  // Get recent tasks
  recent({ type, idNumber }) {
    return Api().get(`task/${type}/${idNumber}/recents`)
  },
  // Get task
  get({ type, idNumber }, id) {
    return Api().get(`task/${type}/${idNumber}/view`, {
      params: { id }
    })
  },
  // get one task with taskId as parameter
  one(taskId) {
    return Api().get(`task/${taskId}`)
  },
  // post one task
  post(task) {
    return Api().post('task', task)
  }
}
