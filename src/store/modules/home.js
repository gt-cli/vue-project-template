import * as types from '../action-types/home'
import { getUserList } from '@/api/home/index'

export default {
  state: {
    userList: []
  },
  getters: {
    userList: state => state.userList
  },
  mutations: {
    // 将用户列表放到 userList 中
    [types.SET_USER_LIST](state, payload) {
      state.userList = payload || []
    }
  },
  actions: {
    // 调用获取用户列表的接口，提交到 mutation 中
    async [types.SET_USER_LIST]({ commit }) {
      const data = await getUserList()
      commit(types.SET_USER_LIST, data)
    }
  }
}
