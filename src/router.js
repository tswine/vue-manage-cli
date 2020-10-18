import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Error from './components/Error.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/error',
    component: Error
  }
  ]
})

export default router
