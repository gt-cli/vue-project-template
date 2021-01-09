import axios from 'axios'
// import { Loading } from 'element-ui'
// let loadingInstance = null
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
      haeders: this.headers,
      ...options
    }
  }
  // 添加拦截器
  setInterceptor(instance, url) {
    instance.interceptors.request.use(config => {
      // if (Object.keys(this.queue).length === 0) {
      //   // 当前是所有请求中的第一个
      //   // 实例话一个 loading 实例
      //   loadingInstance = Loading.service({
      //     fullscreen: true
      //   })
      // }
      // this.queue[url] = true
      return config
    })
    instance.interceptors.response.use(
      res => {
        // 删除已经执行的请求标记
        // delete this.queue[url]
        // if (Object.keys(this.queue).length === 0) {
        //   // 所有请求执行结束
        //   loadingInstance.close()
        // }
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
        // 删除已经执行的请求标记
        // delete this.queue[url]
        // if (Object.keys(this.queue).length === 0) {
        //   loadingInstance.close()
        // }
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
