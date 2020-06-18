import Api from './Api'

export default {
  teacherLogin(credential) {
    return Api().post('login/teacher', credential)
  },
  studentLogin(credential) {
    return Api().post('login/student', credential)
  }
}
