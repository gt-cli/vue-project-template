import Vue from 'vue'
import Vuex from 'vuex'
import rootModules from './rootModules'

Vue.use(Vuex)

// 自动导入模块
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const moduleName = key.replace(/\.\//, '').replace(/\.js/, '')
  const store = files(key).default
  const module = rootModules.modules || {}
  module[moduleName] = store
  // 命名空间
  module[moduleName].namespaced = true
})

export default new Vuex.Store(rootModules)
