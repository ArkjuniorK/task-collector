import Api from './Api'

export default {
  index({ type, idNumber }, page) {
    return Api().get(`theme/${type}/${idNumber}`, {
      params: {
        page: page
      }
    })
  }
}
