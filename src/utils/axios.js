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
      haeders: this.headers,
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
