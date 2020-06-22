import Api from './Api'

export default {
  teacherTasks({ idNumber, page }) {
    return Api().get(`teacher/${idNumber}`, {
      params: {
        page: page
      }
    })
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
