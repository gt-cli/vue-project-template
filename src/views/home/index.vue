<template>
  <div>
    {{ name }}
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" />
    </el-table>
  </div>
</template>

<script>
// import { getUserList } from '@/api/user/index'
import * as types from '@/store/action-types/home'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapGetters('home', {
      userList: 'userList'
    })
  },
  created() {
    this[types.SET_USER_LIST]()
  },
  methods: {
    ...mapActions('home', [
      types.SET_USER_LIST
    ])
  }
}
</script>

<style lang="scss" scoped></style>
