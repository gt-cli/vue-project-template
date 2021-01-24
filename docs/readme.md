## 一.环境搭建

这里我先简单介绍下 `Vue-Cli`各个版本之间的不同。目前我们使用的是`Vue-cli4`版本,

`cli2`和`cli3`的区别很容易看出。整个构建目录的变化及`webpack`的升级，提升了构建项目速度也提供了`vue ui`等，这里主要对比下 `cli3`和`cli4`的区别:



[CHANGELOG](https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md)



- `css`预处理器默认`sass`选项改为`dart sass`
- 更新项目中的版本 （`copy-webpack-plugin v5`、`webpack-chain v5`、`css-loader to v2`、`core-js v3` 、`ESLint v5`、`workbox v4`、`nightwatch v1`、`jest v24`...）
- 一些细节更新

> 总结一下主要就是很多依赖的模块都发生了重大的变化。



### 初始化

**安装最新的`Vue-cli4`**

```
$ npm install @vue/cli -g 
```



**通过** `**vue create**` **创建项目**

```
vue create vue2-project 
```

添加 `vuex` 、添加 `vue-router` 、添加 `dart sass` 

![image.png](https://cdn.nlark.com/yuque/0/2020/png/738210/1606791125733-8d4f00aa-cc65-44b7-b4b6-772474cec5fa.png)

**添加插件**

`element-ui`:`vue-cli-plugin-element` (import on demand)

```
vue add element
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/738210/1606792543582-4fc8003a-972b-453e-ac03-3281621e799a.png)

**添加依赖**

```
axios
```

### 配置目录

```
src
│  App.vue     # 根组件
│  main.js     # 入口文件
├─api          # 存放接口
├─assets       # 存放资源
├─components   # 组件
├─directives   # 自定义指令
├─filters      # 自定义过滤器
├─plugins      # 生成的插件
├─config       # 存放配置文件
├─router       # 存放路由配置
├─store        # 存放vuex配置
├─style        # 存放共用样式
├─utils        # 存放工具方法
└─views        # 存放Vue页面
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/738210/1606794817071-13c56ffb-3777-4a1a-bff2-45e93bd043a8.png?x-oss-process=image%2Fresize%2Cw_1500)

## 二.路由系统配置

### 路由配置

通过 `require.context` 动态导入路由模块，实现路由的模块化,这样我们可以对路由进行分类了 (这里不建议根据页面自动生成路由，这样项目整个太不灵活了)

```
scr/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []

// 获取当前对应文件夹下的指定名符合 这个正则/\.router.js$/ 的文件
const files = require.context('./routes', false, /\.router.js$/)

files.keys().forEach(key => {
  // 获取文件的内容(默认导出的结果)
  const arr = files(key).default
  // routes = routes.concat(arr)
  // 拼接路由
  routes.push(...arr)
})


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
scr/router/routes/home.router.js
export default [
  {
    path: '/',
    name: 'Path',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]
scr/router/routes/article.router.js
export default [
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/article/post.vue')
  }
]
scr/router/routes/user.router.js
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/user/reg.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/user/forget.vue')
  }
]
```

### 路由测试

```
scr/app.vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## 三、eslint配置

### 执行命令

```
vue add @vue/eslint
? Pick an ESLint config: Prettier
? Pick additional lint features: Lint on save
```

### 配置文件

```
scr/.eslintrc.js
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [2, {
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline":"off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}
scr/.eslintignore
build/*.js
config/*.js
src/assets
scr/vue.config.js
module.exports = {
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
```

### 参考

http://www.zuo11.com/blog/2020/10/vue_cli_eslint.html



## 四、vuex配置

```
src/store/index.js
import Vue from "vue";
import Vuex from "vuex";
import rootModules from "./rootModules";

Vue.use(Vuex);

// 自动导入模块
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach(key => {
  const moduleName = key.replace(/\.\//, "").replace(/\.js/, "");
  const store = files(key).default;
  const module = rootModules.modules || {};
  module[moduleName] = store;
  // 命名空间
  module[moduleName].namespaced = true;
});

export default new Vuex.Store(rootModules);
src/store/rootModules.js
export default {
  state: {
    name: "root"
  },
  mutations: {},
  actions: {},
  modules: {}
};
src/store/modules/home.js
export default {
  state: {
    name: "home"
  },
  mutations: {},
  actions: {}
};
src/store/modules/user.js
export default {
  state: {
    name: "user"
  },
  mutations: {},
  actions: {}
};
```

## 五、axios封装

### 安装依赖

```
npm i axios -S
```

### 环境变量配置

```
.env
VUE_APP_BASE_URL = /
.env.development
VUE_APP_BASE_URL = http://loacalhost:8888
.env.production
VUE_APP_BASE_URL = /
.env.test
VUE_APP_BASE_URL = http://loacalhost:8888
```

### 封装axios

```
scr/utils/axios.js
import axios from "axios";
/**
 * 封装的目的是封装公共的拦截器，每一个实例也可以有单独的自己的拦截器
 * 创建一个单独的实例，每次请求都是使用这个方法来创建实例
 */
class Http {
  constructor() {
    this.timeout = 3000; // 超时时间
    this.baseUrl = process.env.VUE_APP_BASE_URL;
    this.headers = { "Content-Type": "application/json" };
  }
  // 合并选项
  mergeOptions(options) {
    return {
      timeout: this.timeout,
      baseUrl: this.baseUrl,
      headers: this.headers,
      ...options
    };
  }
  // 添加拦截器
  setInterceptor(instance) {
    instance.interceptors.request.use(config => {
      return config;
    });
    instance.interceptors.response.use(
      res => {
        if (res.status == 200) {
          const { data } = res;
          if (res.data.error === 1) {
            return Promise.reject(data.errorMsg);
          }
          return Promise.resolve(data.data);
        } else {
          // 错误码统一处理
          switch (res.status) {
            case 401:
              return Promise.reject(`401`);
            case 500:
              return Promise.reject(`server error`);
            default:
              return Promise.reject(`unknown`);
          }
        }
      },
      err => Promise.reject(err)
    );
  }
  request(options) {
    // 合并选项
    const opts = this.mergeOptions(options);
    // 创建实例
    const instance = axios.create();
    // 添加拦截器
    this.setInterceptor(instance);
    // 当调用axios.request 时，内部会创建一个axios实例，并且给这个实例传入配置属性
    return instance(opts);
  }
  get(url, config = {}) {
    return this.request({
      url,
      method: "get",
      ...config
    });
  }
  post(url, data) {
    return this.request({
      method: "post",
      url,
      data
    });
  }
}
export default new Http();
```

## 六、mock配置

### 安装依赖

```
cnpm i mockjs -D
```

### mock配置

```
mock/user.js
import Mock from "mockjs";
const Random = Mock.Random;
Mock.mock("vue-project-template/user/get", "get", () => {
  let users = [];
  Random.increment(20);
  for (let i = 0; i < 10; i++) {
    users.push({
      id: i + 1,
      name: Random.name(),
      age: Random.increment(1)
    });
  }
  return {
    error: 0,
    code: 200,
    data: users,
    errorMsg: ""
  };
});
mock/index.js
import "./modules/user";
```

### API

```
src/api.user.js
import axios from "../utils/axios";

export function getUserList() {
  return axios.get("vue-project-template/user/get");
}
```

### 测试

```
src/main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";

/*
 * mock接口
 */
import "../mock/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
src/views/home/index.vue
<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "Home",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await getUserList();
      this.tableData = res || [];
    }
  }
};
</script>
<style lang="scss" scoped></style>
```

### 参考

http://mockjs.com/



https://tech.meituan.com/2015/10/19/mock-server-in-action.html



## 七、全局配置

```
src/config/setting.js
module.exports = {
  title: 'Vue Project Template'
}
vue.config.js
const setting = require('./src/config/setting')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: process.env.port || '2015',
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = setting.title || 'Vue Project Template'
        return args
      })
  }
}
```

## 八、webpackChunkName

```
src/router/routes/user.router.js
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:'login'*/'@/views/user/login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName:'reg'*/'@/views/user/reg.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName:'forget'*/'@/views/user/forget.vue')
  }
]
```



```
src/router/routes/home.router.js
export default [
  {
    path: '/',
    name: 'Path',
    component: () => import(/* webpackChunkName:'home'*/'@/views/home/index.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName:'404'*/'@/views/404.vue')
  }
]
src/router/routes/article.router.js
export default [
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName:'post'*/'@/views/article/post.vue')
  }
]
```

## 九、API 封装

### API

```
src/api/home/config.js
export default {
  // 获取用户列表
  getUserLists: 'vue-project-template/user/get'
}
src/api/home/index.js
import axios from '@/utils/axios'
import config from './config'

// 获取用户接口
export const getUserList = () => axios.get(config.getUserLists)
```

### vuex

```
src/store/action-types/home.js
// 设置用户列表
export const SET_USER_LIST = 'SET_USER_LIST'
src/store/modules/home.js
import * as types from '../action-types/home'
import { getUserList } from '@/api/home/index'

export default {
  state: {
    userList: []
  },
  getters: {
    userList: state => state.userList
  },
  mutations: {
    // 将用户列表放到 userList 中
    [types.SET_USER_LIST](state, payload) {
      state.userList = payload || []
    }
  },
  actions: {
    // 调用获取用户列表的接口，提交到 mutation 中
    async [types.SET_USER_LIST]({ commit }) {
      const data = await getUserList()
      commit(types.SET_USER_LIST, data)
    }
  }
}
src/store/rootModules.js
export default {
  state: {
    name: 'root'
  },
  getters: {
    name: state => state.name
  },
  mutations: {},
  actions: {},
  modules: {}
}
src/store/index.js
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
```

#### 测试

```
src/views/home/index.vue
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
```

![image.png](https://cdn.nlark.com/yuque/0/2021/png/738210/1610167548569-61f47fb6-1d57-4ad9-82a9-234b47fd161c.png?x-oss-process=image%2Fresize%2Cw_1500)

## 十、axios完善

### 取消请求

```
src/utils/axios.js
import axios from 'axios'
import store from '@/store/index'
import * as types from '@/store/action-types/request'

/**
 * 封装的目的是封装公共的拦截器，每一个实例也可以有单独的自己的拦截器
 * 创建一个单独的实例，每次请求都是使用这个方法来创建实例
 */
class Http {
  constructor() {
    this.timeout = 3000 // 超时时间
    this.baseUrl = process.env.VUE_APP_BASE_URL
    this.headers = { 'Content-Type': 'application/json' }
    this.queue = {} // 记录请求
  }
  // 合并选项
  mergeOptions(options) {
    return {
      timeout: this.timeout,
      baseUrl: this.baseUrl,
      headers: this.headers,
      ...options
    }
  }
  // 添加拦截器
  setInterceptor(instance, url) {
    instance.interceptors.request.use(config => {
      const Cancel = axios.CancelToken
      config.cancelToken = new Cancel(c => {
        store.commit(types.SET_REQUEST_TOKEN, c)
      })
      return config
    })
    instance.interceptors.response.use(
      res => {
        if (res.status === 200) {
          const { data } = res
          if (res.data.error === 1) {
            return Promise.reject(data.errorMsg)
          }
          return Promise.resolve(data.data)
        } else {
          // 错误码统一处理
          switch (res.status) {
            case 401:
              return Promise.reject(`401`)
            case 500:
              return Promise.reject(`server error`)
            default:
              return Promise.reject(`unknown`)
          }
        }
      },
      err => {
        Promise.reject(err)
      }
    )
  }
  request(options) {
    // 合并选项
    const opts = this.mergeOptions(options)
    // 创建实例
    const instance = axios.create()
    // 添加拦截器
    this.setInterceptor(instance, opts.url)
    // 当调用axios.request 时，内部会创建一个axios实例，并且给这个实例传入配置属性
    return instance(opts)
  }
  get(url, config = {}) {
    return this.request({
      url,
      method: 'get',
      ...config
    })
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}
export default new Http()
src/store/action-types/request.js
// 存放 axios cancel token
export const SET_REQUEST_TOKEN = 'SET_REQUEST_TOKEN'
src/store/rootModules.js
import * as types from './action-types/request'
export default {
  state: {
    name: 'root',
    axiosTokens: []
  },
  getters: {
    name: state => state.name
  },
  mutations: {
    [types.SET_REQUEST_TOKEN](state, payload) {
      if (payload === 'clear') {
        state.axiosTokens = []
      } else {
        state.axiosTokens = [...state.axiosTokens, payload]
      }
    }
  },
  actions: {},
  modules: {}
}
```

### 路由钩子

```
src/router/hooks.js
import store from '@/store/index'
import * as types from '@/store/action-types/request'
export default {
  'cancelToken': async function(to, form, next) {
    // cancelToken 名字只是开发时用，async 后面的方法才是 beforeEach
    console.log(store.state.axiosTokens)
    store.state.axiosTokens.forEach(fn => fn()) // 取消上一个页面的请求
    store.commit(types.SET_REQUEST_TOKEN, 'clear') // 清除 axiosTokens
    next()
  }
}
src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks'

Vue.use(VueRouter)

const routes = []

// 获取当前对应文件夹下的指定名符合 这个正则/\.router.js$/ 的文件
const files = require.context('./routes', false, /\.router.js$/)

files.keys().forEach(key => {
  // 获取文件的内容(默认导出的结果)
  const arr = files(key).default
  // routes = routes.concat(arr)
  // 拼接路由
  routes.push(...arr)
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 给路由添加多个钩子，每个钩子实现一个具体的功能
Object.values(hooks).forEach(hook => {
  // 绑定 hook 中的 this 是路由的实例
  router.beforeEach(hook.bind(router))
})

export default router
```

### 测试

```
scr/App.vue
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
```

## 十一、权限设计

[http://www.zhufengpeixun.com/jg-vue/vue-apply/project-2.html#%E4%B8%80-%E7%99%BB%E5%BD%95%E6%9D%83%E9%99%90](http://www.zhufengpeixun.com/jg-vue/vue-apply/project-2.html#一-登录权限)