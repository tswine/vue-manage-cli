import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue')
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const Welcome = () => import(/* webpackChunkName: "home" */ './views/Welcome.vue')
const UserList = () => import(/* webpackChunkName: "user" */ './views/user/UserList.vue')
const RoleList = () => import(/* webpackChunkName: "role" */ './views/role/RoleList.vue')
const PermissionList = () => import(/* webpackChunkName: "role" */ './views/role/PermissionList.vue')

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
      }, {
        path: '/permission/list',
        component: PermissionList
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
