<template>
  <div>
    <el-menus />
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" />
    </el-table>
  </div>
</template>

<script>
import ElMenus from '@/components/Menu/index'
import options from './options/index'
export default {
  name: 'Home',
  components: {
    ElMenus
  },
  ...options
}
</script>

<style lang="scss" scoped></style>
