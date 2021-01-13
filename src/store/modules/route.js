import * as types from '../action-types/index'
import store from '../index'
import routes from '@/router/permission'
import router from '@/router/index'

/**
 * 过滤路由
 * @param {权限路由} authList
 */
function filterRouter(authList) {
  const auths = authList.map(item => item.auth)
  function filter(routes) {
    return routes.filter(route => {
      if (auths.includes(route.meta.auth)) {
        if (route.children) {
          route.children = filter(route.children)
        }
        return route
      }
    })
  }
  return filter(routes)
}
export default {
  state: {
    menuPermission: false // 默认没有处理菜单
  },
  mutations: {
    [types.SET_ROUTE](state, payload) {
      state.routes = payload
    },
    [types.SET_MENU_PERMISSION](state, payload) {
      state.menuPermission = payload
    }
  },
  actions: {
    async [types.SET_ROUTE]({ commit }) {
      const authList = store.state.user.userInfo.authList
      if (authList) {
        const perRoutes = filterRouter(authList) // 过滤路由
        // const route = router.options.routes.find(item => item.path === '/manager')
        console.log(perRoutes)
        router.addRoutes(perRoutes)
        commit(types.SET_MENU_PERMISSION, true)
      } else {
        // 没有权限也要设置成有权限了
        commit(types.SET_MENU_PERMISSION, true)
      }
    }
  }
}
