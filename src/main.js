import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element-ui插件
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'
// axios异步请求
import axios from './config/Axios.js'

Vue.config.productionTip = false
// 挂载全局axios
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
