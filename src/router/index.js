import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [];

// 获取当前对应文件夹下的指定名符合 这个正则/\.router.js$/ 的文件
const files = require.context("./routes", false, /\.router.js$/);

files.keys().forEach(key => {
  // 获取文件的内容(默认导出的结果)
  const arr = files(key).default;
  // routes = routes.concat(arr)
  // 拼接路由
  routes.push(...arr);
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
