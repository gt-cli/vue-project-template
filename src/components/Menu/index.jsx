import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('route')
export default {
  data() {
    return {
      menuTree: []
    }
  },
  computed: {
    ...mapState(['routes'])
  },
  created() {
    // const mapping = {}
    // const authList = this.userInfo.authList
    // console.log(this.$router)
    // authList.forEach(a => {
    //   a.children = []
    //   mapping[a.id = a]
    //   if (a.pid === -1) {
    //     this.menuTree.push(a)
    //   } else {
    //     mapping[a.pid] && mapping[a.pid].children.push(a)
    //   }
    // })
    console.log(this.routes)
    this.menuTree = this.routes.filter(r => r.meta?.needLogin)
  },
  render() {
    const renderChildren = list => {
      return list.map(item => {
        return item.children && item.children.length
          ? <el-submenu index={item.path}>
            <div slot='title'> {item.name} </div>
            {renderChildren(item.children)}
          </el-submenu>
          : <el-menu-item index={item.path}> {item.name}</el-menu-item>
      })
    }
    return <el-menu background-color='#2a2a2a' text-color='#ffffff' active-text-color='#ffffff' router={true}>
      {renderChildren(this.menuTree)}
    </el-menu>
  }
}
