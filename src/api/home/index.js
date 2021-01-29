import Axios from '@/utils/axios'
import config from './config'
const axios = new Axios()
// 获取用户接口
export const getUserList = () => axios.get(config.getUserLists)
