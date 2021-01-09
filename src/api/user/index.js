
import axios from '@/utils/axios'
import config from './config'

// 获取用户接口
export const validate = () => axios.get(config.validate)

// 用户登录
export const login = (data) => axios.post(config.login, data)
