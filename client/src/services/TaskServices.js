import Api from './Api'

export default {
  /* TODO Get recent tasks */
  recent({ type, idNumber }) {
    return Api().get(`task/${type}/${idNumber}/recents`)
  },
  // get one task with taskId as parameter
  index(taskId) {
    return Api().get(`task/${taskId}`)
  },
  // post one task
  post(task) {
    return Api().post('task', task)
  }
}
