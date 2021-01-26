import * as types from '@/store/action-types/index'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('home')
export default {
  ...mapActions([
    types.SET_USER_LIST
  ])
}
