import React from 'react'
import axios from 'axios'
import { BASEURL } from './url'
import { getToken,deleteToken } from './token'

axios.defaults.baseURL = BASEURL
console.log(BASEURL)

React.Component.prototype.$axios = axios

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(response.data.status === 400) {
      deleteToken()
    }
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
export { axios }
