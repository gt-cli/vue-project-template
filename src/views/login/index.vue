<template>
  <div class="login">
    <el-card shadow="always">
      <div slot="header" class="clearfix">
        <h1>管理系统登录</h1>
      </div>
      <el-form ref="login" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入用密码"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
}
</script>

<style lang="scss">
$bg-color: rgb(79, 173, 204);
$bg-img: '../../assets/img/login-bg.jpeg';
$card-bg-coloer: rgba(0,0,0,0.5);
$card-color: #FFFFFF;
$input-bg-color: #EEEEEE;
.login {
  background-color: $bg-color;
  background: url($bg-img) no-repeat;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card {
    width: 450px;
    background: $card-bg-coloer;
    background-position: center;
    border-color: transparent;
    color: $card-color;
    &__header {
      padding: 0;
      border-bottom: none;
    }
    input {
      background: $input-bg-color;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
