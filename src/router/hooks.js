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
