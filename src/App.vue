<template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      router
      background-color="#545C64"
      text-color="#FFFFFF"
      active-text-color="#FFD04B"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/post">文章</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  img {
    width: 80px;
    height: 80px;
  }
}
</style>
