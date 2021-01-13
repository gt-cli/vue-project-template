import * as types from '../action-types/index'
import WS from '@/utils/websocket'
export default {
  state: {
    ws: null,
    message: null
  },
  getters: {
    userList: state => state.userList
  },
  mutations: {
    [types.CREATE_WEBSOCKET](state, ws) {
      state.ws = ws
    },
    [types.SET_MESSAGE](state, msg) {
      state.message = msg
    }
  },
  actions: {
    async [types.CREATE_WEBSOCKET]({ commit }) {
      const ws = new WS()
      ws.create()
      commit(types.CREATE_WEBSOCKET, ws)
    }
  }
}
