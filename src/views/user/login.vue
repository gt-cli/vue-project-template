<template>
  <div>
    <el-button type="danger" @click="login">login</el-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/store/action-types/index'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'Home',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    ...mapActions([
      types.USER_LOGIN
    ]),
    async login() {
      const data = await this[types.USER_LOGIN]({
        name: 'admin',
        password: '1234'
      })
      if (data) {
        this.message('success')
        this.$router.push('/')
      } else {
        this.message('failed', 'error')
      }
    },
    message(text, type) {
      this.$message({
        message: text,
        type: type || 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
