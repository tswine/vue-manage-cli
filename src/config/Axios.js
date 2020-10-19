import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
// import router from '../router.js'
import {
  Loading
} from 'element-ui'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
var loadingInstace
// 设置拦截器
axios.interceptors.request.use(
  request => {
    if (request.method === 'post') {
      request.data = qs.stringify(request.data)
    }
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
    const {
      data: res
    } = response
    if (res.code === 200) {
      res.status = true
    } else {
      res.status = false
    }
    response.data = res
    return response
  }, error => {
    loadingInstace.close()
    Vue.prototype.$message.error('服务器开小差了~~~')
    // router.replace('/error')
    throw error
  })

export default axios
