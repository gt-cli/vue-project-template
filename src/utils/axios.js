import axios from 'axios'
import store from '@/store/index'
import * as types from '@/store/action-types/index'
import qs from 'qs'
import { codeMessage } from './error'
import router from '@/router/index'

/**
 * 封装的目的是封装公共的拦截器，每一个实例也可以有单独的自己的拦截器
 * 创建一个单独的实例，每次请求都是使用这个方法来创建实例
 */
class Http {
  constructor(url, headers = {}) {
    this.timeout = 3000 // 超时时间
    this.baseUrl = url || process.env.VUE_APP_BASE_URL
    this.headers = { 'Content-Type': 'application/json', ...headers }
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
      // 添加cancel token
      const Cancel = axios.CancelToken
      config.cancelToken = new Cancel(c => {
        store.commit(types.SET_REQUEST_TOKEN, c)
      })

      // 添加jwt
      // config.headers.authorization = `Bearer ${token}`

      // 数据格式化
      if (config.method.toUpperCase() !== 'GET') {
        config.data = qs.stringify(config.data)
      }
      return config
    }, err => {
      return Promise.reject(err)
    })

    instance.interceptors.response.use(
      res => {
        const { status, data } = res
        if (status === 200) {
          if (data.error === 1) {
            return Promise.reject(data.errorMsg)
          }
          return Promise.resolve(data.data)
        } else {
          // 错误码统一处理
          const statusText = codeMessage[status] || '服务端异常。'
          return Promise.reject(statusText)
        }
      },
      err => {
        if (err) {
          // 请求配置发生的错误
          if (!err.response) {
            return console.log('err', err.message)
          }

          // 获取状态码
          const status = err.response.status
          const statusText = codeMessage[status] || err.response.statusText
          console.log(`${status}: ${statusText}`)

          // 错误状态处理
          if (status === 401) {
            router.push('/login')
          } else if (status === 403) {
            router.push('/login')
          } else if (status >= 404 && status < 422) {
            router.push('/404')
          }
        }
        return Promise.reject(err)
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
export default Http
