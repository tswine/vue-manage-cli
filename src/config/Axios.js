import Vue from 'vue'
import axios from 'axios'
// import router from '../router.js'
import {
  Loading
} from 'element-ui'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
var loadingInstace
// 设置拦截器
axios.interceptors.request.use(
  request => {
    request.headers.Authorization = window.sessionStorage.getItem('token')
    // element ui Loading方法
    loadingInstace = Loading.service({
      lock: true,
      text: '数据请求中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)',
      customClass: 'osloading',
      fullscreen: true
    })
    return request
  })

// 在 response 拦截器中
axios.interceptors.response.use(
  response => {
    loadingInstace.close()
    return response
  }, error => {
    loadingInstace.close()
    Vue.prototype.$message.error('服务器开小差了~~~')
    // router.replace('/error')
    throw error
  })

export default axios
