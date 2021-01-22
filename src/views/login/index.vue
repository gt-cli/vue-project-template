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
import options from './options/index'
import './style/index.scss'
export default {
  name: 'Home',
  ...options
}
</script>
