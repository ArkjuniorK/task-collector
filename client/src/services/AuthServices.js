import Api from './Api'

export default {
  // Get school list
  index() {
    return Api().get('register')
  },
  // Register endpoint
  create(type, payload) {
    return Api().post(`register/${type}`, payload)
  },
  // Login endpoint
  post(type, payload) {
    return Api().post(`login/${type}`, payload)
  }
}
