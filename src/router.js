import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */ './components/Login.vue')
const Home = () => import(/* webpackChunkName: "home" */ './components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "home" */ './components/Welcome.vue')
const UserList = () => import(/* webpackChunkName: "user" */ './components/user/List.vue')
const RoleList = () => import(/* webpackChunkName: "role" */ './views/role/RoleList.vue')

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
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome',
        component: Welcome
      }, {
        path: '/user/list',
        component: UserList
      }, {
        path: '/role/list',
        component: RoleList
      }]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
