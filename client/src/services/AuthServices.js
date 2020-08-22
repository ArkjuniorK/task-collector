import Api from './Api'

export default {
  /* TODO Get school list */
  index() {
    return Api().get('register')
  },
  /* TODO Register endpoint */
  create(type, payload) {
    return Api().post(`register/${type}`, payload)
  },
  /* TODO Login endpoint */
  post(type, payload) {
    return Api().post(`login/${type}`, payload)
  }
}
