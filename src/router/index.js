import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks'

Vue.use(VueRouter)

const routes = []

// 获取当前对应文件夹下的指定名符合 这个正则/\.router.js$/ 的文件
const files = require.context('./routes', false, /\.router.js$/)

files.keys().forEach(key => {
  // 获取文件的内容(默认导出的结果)
  const arr = files(key).default
  // routes = routes.concat(arr)
  // 拼接路由
  routes.push(...arr)
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 给路由添加多个钩子，每个钩子实现一个具体的功能
Object.values(hooks).forEach(hook => {
  // 绑定 hook 中的 this 是路由的实例
  router.beforeEach(hook.bind(router))
})

export default router
