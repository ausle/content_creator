import axios from 'axios'
import { message } from 'ant-design-vue'
import { REQUEST_TIMEOUT, UNAUTHORIZED_CODE } from '@/constants'

const myAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
})

myAxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

myAxios.interceptors.response.use(
  function (response) {
    const { data } = response

    if (data.code === UNAUTHORIZED_CODE) {
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }

    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default myAxios
