import Api from './Api'

export default {
  // get one task with taskId as parameter
  index(taskId) {
    return Api().get(`task/${taskId}`)
  },
  // post one task
  post(task) {
    return Api().post('task', task)
  }
}
