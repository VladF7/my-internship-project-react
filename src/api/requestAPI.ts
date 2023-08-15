import axios from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    needAuth?: boolean
  }
}

const baseURL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseURL
})

axiosInstance.interceptors.request.use((config) => {
  if (config.needAuth) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }
  if (config.data) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('Error: ' + JSON.stringify(error.response?.data))
    throw error
  }
)

export { axiosInstance }
