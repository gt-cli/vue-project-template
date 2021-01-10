import * as types from '../action-types/index'
import { validate, login } from '@/api/user/index'
import { setLocal, getLocal } from '@/utils/storage-helper'
export default {
  state: {
    name: 'user',
    userInfo: {},
    hasPermission: false
  },
  mutations: {
    [types.SET_USER](state, payload) {
      state.userInfo = payload
      if (payload && payload.token) {
        setLocal('token', payload.token)
      } else {
        localStorage.clear('token')
      }
    },
    [types.SET_PERMISSION](state, payload) {
      state.hasPermission = payload
    }
  },
  actions: {
    async [types.USER_LOGIN]({ commit }, payload) {
      try {
        const result = await login(payload)
        commit(types.SET_USER, result)
        commit(types.SET_PERMISSION, true)
        return true
      } catch (e) {
        commit(types.SET_USER, {})
      }
    },
    async [types.USER_VALIDATE]({ commit }) {
      // 没有权限
      if (!getLocal('token')) return false
      try {
        const result = await validate()
        commit(types.SET_USER, result)
        commit(types.SET_PERMISSION, true)
        return true
      } catch (e) {
        commit(types.SET_USER, {})
        commit(types.SET_PERMISSION, false)
      }
    }
  }
}
