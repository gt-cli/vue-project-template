
import Axios, { axios } from '@/utils/axios'
const ajax = new Axios()
import config from './config'
// 获取用户接口
export const validate = () => axios.get(config.validate)

// 用户登录
export const login = (data) => ajax.post(config.login, data)
