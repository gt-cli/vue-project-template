import { createNamespacedHelpers, mapGetters as rootMapGetters } from 'vuex'
const { mapGetters } = createNamespacedHelpers('home')
export default {
  ...rootMapGetters([
    'name'
  ]),
  ...mapGetters({
    userList: 'userList'
  })
}
