import Api from './Api'

export default {
  index({ type, idNumber }, page) {
    return Api().get(`subtheme/${type}/${idNumber}`, {
      params: { page: page }
    })
  }
}
