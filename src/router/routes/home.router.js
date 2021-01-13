export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      needLogin: true
    },
    component: () => import(/* webpackChunkName:'home'*/'@/views/home/index.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName:'404'*/'@/views/404.vue')
  }
]
