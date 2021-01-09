import types from './action-types/index'
export default {
  state: {
    name: 'root',
    axiosTokens: []
  },
  getters: {
    name: state => state.name
  },
  mutations: {
    [types.SET_REQUEST_TOKEN](state, payload) {
      if (payload === 'clear') {
        state.axiosTokens = []
      } else {
        state.axiosTokens = [...state.axiosTokens, payload]
      }
    }
  },
  actions: {},
  modules: {}
}
