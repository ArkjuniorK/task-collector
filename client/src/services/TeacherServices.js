import Api from './Api'

export default {
  /* get the teacher tasks (all task) */
  teacherTasks({ idNumber, page }) {
    return console.log('Hello World')
    /* return Api().get(`teacher/${idNumber}`, {
      params: {
        page: page
      }
    }) */
  },
  teacherStudents(idNumber) {
    return Api().get(`teacher/${idNumber}/students`)
  }
}
