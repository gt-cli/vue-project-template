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
import * as types from '@/store/action-types/home'
import { createNamespacedHelpers, mapGetters as rootMapGetters } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('home')
export default {
  name: 'Home',
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...rootMapGetters([
      'name'
    ]),
    ...mapGetters({
      userList: 'userList'
    })
  },
  async created() {
    try {
      await this[types.SET_USER_LIST]()
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions([
      types.SET_USER_LIST
    ])
  }
}
</script>

<style lang="scss" scoped></style>
