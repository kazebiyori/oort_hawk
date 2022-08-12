<template>

  <div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" editable @tab-click="handleClick" @edit="handleEdit">
      <template v-for="tag in tags" :key="tag">
        <el-tab-pane :label="generateTagName(tag)" :name="tag">
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>

</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: '/datadisplay'
    }
  },
  watch: {
    $route(to) {
      this.activeName = to.path
      this.SET_TAG({ tag: to.path });
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tagbar.cacheTags,
    }),
    ...mapState({
      activeTag: state => state.tagbar.activeTag
    })
  },
  methods: {
    handleEdit(targetName) {
      this.DELETE_TAG(targetName)
      this.SET_TAG()
      this.activeName = this.activeTag
      this.$router.push(this.activeTag)
    },
    handleClick(tabs, event) {
      this.$router.push(tabs.paneName)
    }

    ,
    generateTagName(path) {
      switch (path.match(/[a-zA-Z]+/)[0]) {
        case 'datadisplay':
          return '数据展示'
        case 'datastatistics':
          return '数据统计'
        case 'datacriterion':
          return '数据判读'
        case 'criterionediting':
          return '编辑判据'
        default:
          return '无名氏'
      }

    }
    ,
    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'DELETE_TAG',
      'SET_TAG'
    ]),
    screenFull() {
      if (!screenfull.isEnabled) {
        this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
        return false
      }
      screenfull.toggle();
    },
  },

}
</script>


<style lang="scss" scoped>
@import '@/styles/variables.scss';

::v-deep .el-tabs__new-tab {
  height: 0px;
  width: 0px;
}
</style>
