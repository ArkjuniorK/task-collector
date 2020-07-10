import axios from 'axios'
import store from '../store'

export default () => {
  return axios.create({
    baseURL: 'https://task-collector.herokuapp.com/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
