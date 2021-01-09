export default [
  {
    path: '/post',
    name: 'Post',
    meta: {
      needLogin: true
    },
    component: () => import(/* webpackChunkName:'post'*/'@/views/article/post.vue')
  }
]
