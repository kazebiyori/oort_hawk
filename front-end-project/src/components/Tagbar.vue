<template>

  <el-tabs v-model="activeName" type="card" class="demo-tabs" editable @tab-click="handleClick" @edit="handleEdit">

    <template v-for="tag in tags" :key="tag">
      <el-tab-pane :label="generateTagName(tag)" :name="tag">
      </el-tab-pane>
    </template>

  </el-tabs>

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
@import '@/styles/a-my-variables.scss';

.el-tabs__new-tab {
  height: 0px;
  width: 0px
}

.el-scrollbar {
  background-color: #42b983;
}

.tags-view-item {
  text-decoration: none;
  display: inline-block;

  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 3px;

  &:first-of-type {
    margin-left: 10px;
  }

  &:last-of-type {
    margin-right: 15px;
  }

  &.el-icon-clos {
    display: block;
    margin: auto;
    margin-top: 13px;
  }

  &.active {
    background-color: #42b983;
    color: #fff;

    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }

  router-link {
    text-decoration: none;
  }
}

.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transform-origin: 100% 50%;

  &:before {
    transform: scale(.6);
    display: inline-block;
    vertical-align: -3px;
  }

  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>
