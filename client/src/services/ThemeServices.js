import Api from './Api'

export default {
  index({ type, idNumber }, page) {
    return Api().get(`theme/${type}/${idNumber}`, {
      params: {
        page: page
      }
    })
  },
  get({ type, idNumber }, id) {
    return Api().get(`theme/${type}/${idNumber}/view`, {
      params: {
        id: id
      }
    })
  },
  post(teacherId, payload) {
    return Api().post(`theme/${teacherId}`, payload)
  },
  delete(teacherId, payload) {
    return Api().delete(`theme/`, {
      params: { teacherId: teacherId, themeId: payload }
    })
  },
  list(teacherId) {
    return Api().get(`theme/${teacherId}`)
  }
}
