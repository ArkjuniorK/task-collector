import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:8081/api'
        : 'https://task-collector.herokuapp.com/api',
    // baseURL: 'http://localhost:8081/api',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
