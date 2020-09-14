import Api from './Api'

export default {
  /* get the teacher tasks (all task) */
  teacherStudents(idNumber) {
    return Api().get(`teacher/${idNumber}/students`)
  }
}
