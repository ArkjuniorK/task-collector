import Api from './Api'

export default {
  addTask(task) {
    return Api().post('task', task)
  }
}
