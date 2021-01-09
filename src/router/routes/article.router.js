export default [
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName:'post'*/'@/views/article/post.vue')
  }
]
