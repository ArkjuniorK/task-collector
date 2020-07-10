import Api from './Api'

export default {
  /* get the student tasks (all task) */
  teacherTasks({ idNumber, page }) {
    return Api().get(`student/${idNumber}`, {
      params: {
        page: page
      }
    })
  },
  /* get one task */
  teacherTask(idNumber, taskId) {
    return Api().get(`student/${idNumber}`, {
      params: {
        task: taskId
      }
    })
  }
}
