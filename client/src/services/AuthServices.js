import Api from './Api'

export default {
  /* register end point */
  /* get school list */
  register() {
    return Api().get('register')
  },
  teacherRegister(payload) {
    return Api().post('register/teacher', payload)
  },
  studentRegister(payload) {
    return Api().post('register/student', payload)
  },
  /* login endpoint */
  teacherLogin(credential) {
    return Api().post('login/teacher', credential)
  },
  studentLogin(credential) {
    return Api().post('login/student', credential)
  }
}
