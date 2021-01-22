import { createNamespacedHelpers } from 'vuex'
import * as types from '@/store/action-types/index'
const { mapActions } = createNamespacedHelpers('user')

export default {
  ...mapActions([
    types.USER_LOGIN
  ]),
  login() {
    this.$refs.login.validate((valid) => {
      if (valid) {
        this.userLogin()
      }
    })
  },
  async userLogin() {
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
