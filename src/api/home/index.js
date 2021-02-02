import { axios } from '@/utils/axios'
import config from './config'
// 获取用户接口
export const getUserList = () => axios.get(config.getUserLists)
