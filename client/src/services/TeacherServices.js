import Api from './Api'

export default {
  teacherTasks(idNumber) {
    return Api().get(`teacher/${idNumber}`)
  },
  teacherTask(idNumber, taskId) {
    return Api().get(`teacher/${idNumber}`, {
      params: {
        task: taskId
      }
    })
  },
  teacherStudents(idNumber) {
    return Api().get(`teacher/${idNumber}/students`)
  }
}
