export default [
  {
    path: '/manager',
    name: 'Manager',
    meta: {
      needLogin: true,
      auth: 'manager'
    },
    component: () => import(/* webpackChunkName:'manager'*/'@/views/manager/index.vue')
  },
  {
    path: '/person',
    name: 'Person',
    meta: {
      needLogin: true,
      auth: 'person'
    },
    component: () => import(/* webpackChunkName:'manager'*/'@/views/manager/index.vue')
  }
]
