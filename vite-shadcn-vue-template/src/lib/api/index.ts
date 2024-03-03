/* eslint-disable */
import { useLoadingStore } from '@/store/loadingStore'
import { AppError } from '@/utils/erros/AppError'
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
// import { HttpsProxyAgent } from 'https-proxy-agent'
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export const BASE_URL_API = 'https://api.test.com'

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: 10000,
  // httpsAgent: agent,
})

const requestHandler = async (requestConfig: AdaptAxiosRequestConfig) => {
  try {
    const { setIsLoading } = useLoadingStore()

    setIsLoading(true)

    const token = ''

    if (token) {
      requestConfig.headers.Authorization = 'bearer ' + token
    }
  } catch (e) {
    console.error(e)
  }

  return requestConfig
}

const responseHandler = async (response: AxiosResponse) => {
  const { setIsLoading } = useLoadingStore()

  setIsLoading(false)

  return response
}

axiosInstance.interceptors.request.use((requestConfig) => requestHandler(requestConfig))
axiosInstance.interceptors.response.use((response) => responseHandler(response))

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { setIsLoading } = useLoadingStore()

    setIsLoading(false)

    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.error.message))
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
