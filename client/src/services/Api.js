import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    /* baseURL: 'https://task-collector.herokuapp.com/', */
    baseURL: 'http://localhost:8081/api',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
