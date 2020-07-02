import Api from './Api'

export default {
  /* get the teacher tasks (all task) */
  teacherTasks({ idNumber, page }) {
    return Api().get(`teacher/${idNumber}`, {
      params: {
        page: page
      }
    })
  },
  /* get one task */
  teacherTask(idNumber, taskId) {
    return Api().get(`teacher/${idNumber}`, {
      params: {
        task: taskId
      }
    })
  },
  teacherTasksSearch({ idNumber, search }) {
    return Api().post(`teacher/${idNumber}`, {
      params: {
        search: search
      }
    })
  },
  teacherStudents(idNumber) {
    return Api().get(`teacher/${idNumber}/students`)
  }
}
