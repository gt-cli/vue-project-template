export default [
  {
    path: "/",
    name: "Path",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "*",
    component: () => import("@/views/404.vue")
  }
];
