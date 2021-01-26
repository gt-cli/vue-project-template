import * as types from '@/store/action-types/index'
export default {
  async created() {
    try {
      await this[types.SET_USER_LIST]()
    } catch (e) {
      console.log(e)
    }
  }
}
