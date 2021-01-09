export default [
  {
    path: '/',
    name: 'Path',
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
