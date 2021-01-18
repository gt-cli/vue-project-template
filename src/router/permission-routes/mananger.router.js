export default [
  {
    path: '/manager',
    name: 'Manager',
    meta: {
      needLogin: true,
      auth: 'manager'
    },
    component: () => import(/* webpackChunkName:'manager'*/'@/views/manager/index.vue'),
    children: [
      {
        path: 'user',
        name: 'MangerUser',
        meta: {
          needLogin: true,
          auth: 'manager'
        },
        component: () => import(/* webpackChunkName:'manger-user'*/'@/views/user/index.vue')
      }
    ]
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
