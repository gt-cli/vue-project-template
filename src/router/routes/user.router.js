export default [
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName:'user'*/'@/views/user/index.vue')
  }
]
