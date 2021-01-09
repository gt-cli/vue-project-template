export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:'login'*/'@/views/user/login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName:'reg'*/'@/views/user/reg.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName:'forget'*/'@/views/user/forget.vue')
  }
]
