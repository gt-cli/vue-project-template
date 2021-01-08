export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/user/login.vue")
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("@/views/user/reg.vue")
  },
  {
    path: "/forget",
    name: "Forget",
    component: () => import("@/views/user/forget.vue")
  }
];
