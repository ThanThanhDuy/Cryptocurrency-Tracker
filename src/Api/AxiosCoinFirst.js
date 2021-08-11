import axios from 'axios'

const axiosCoinFirst = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosCoinFirst.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
axiosCoinFirst.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default axiosCoinFirst
