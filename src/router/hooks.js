import store from '@/store/index'
import * as types from '@/store/action-types/index'

export default {
  'cancelToken': async function(to, form, next) {
    // cancelToken 名字只是开发时用，async 后面的方法才是 beforeEach
    const msg = 'Operation canceled by the user'
    store.state.axiosTokens.forEach(fn => fn(msg)) // 取消上一个页面的请求
    store.commit(types.SET_REQUEST_TOKEN, 'clear') // 清除 axiosTokens
    next()
  },
  'loginPermission': async function(to, form, next) {
    // 返回的结果，需要存到 vuex 中
    // 先判断是否需要登录
    const needLogin = to.matched.some(item => item.meta.needLogin)
    const flag = await store.dispatch(`user/${types.USER_VALIDATE}`)

    if (!store.state.user.hasPermission) {
      if (needLogin) { // 没权限需要登录,那就校验是否登陆过
        if (!flag) { // 没登陆过
          next('/login')
        } else {
          next()
        }
      } else { // 没权限不需要登录
        next()
      }
    } else {
      // 有权限
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
    }
  },
  'menuPermission': async function(to, form, next) {
    if (store.state.user.hasPermission) {
      // 是否添加过路由
      // 如果已经添加过了，继续往下走
      if (!store.state.route.menuPermission) {
        // 获取最新路由权限，根据用户权限来获取
        store.dispatch(`route/${types.SET_ROUTE}`) // 添加路由
        next({ ...to, replace: true }) // hack
      } else {
        // 已经获取过菜单权限了或者页面加载完毕后
        next()
      }
    } else {
      next()
    }
  },
  'createWebsocket': async function(to, form, next) {
    if (store.state.user.hasPermission && !store.state.ws) {
      // store.dispatch(`websocket/${types.CREATE_WEBSOCKET}`)
      next()
    } else {
      next()
    }
  }
}
