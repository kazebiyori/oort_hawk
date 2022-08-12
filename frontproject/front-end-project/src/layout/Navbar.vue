<template>
  <div class="nav-container">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="1" @click="addTag(1)">数据展示</el-menu-item>
      <el-menu-item index="2" @click="addTag(2)">数据统计</el-menu-item>
      <el-menu-item index="3" @click="addTag(3)">数据判读</el-menu-item>
      <el-menu-item index="4" @click="addTag(4)">编辑判据</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'
import screenfull from 'screenfull'

import { asyncDataStatistics, asyncDataDisplay, asyncDataCriterion, asyncCriterionEditing } from '@/utiles/asyncComponents.js'

export default {
  data() {
    return {
      n: 0
    }
  },
  methods: {
    async addTag(id) {
      switch (id) {
        case 1: {
          const name = `datadisplay${++this.n}`
          const com = await asyncDataDisplay(name)
          this.$router.addRoute({ path: `/${name}`, component: com })
          this.PUSH_TAG({ tag: `/${name}` })
          this.$router.push(`/${name}`)
          break
        }
        case 2: {
          const name = `datastatistics${++this.n}`
          const com = await asyncDataStatistics(name)
          this.$router.addRoute({ path: `/${name}`, component: com })
          this.PUSH_TAG({ tag: `/${name}` })
          this.$router.push(`/${name}`)
          break
        } case 3: {
          const name = `datacriterion${++this.n}`
          const com = await asyncDataCriterion(name)
          this.$router.addRoute({ path: `/${name}`, component: com })
          this.PUSH_TAG({ tag: `/${name}` })
          this.$router.push(`/${name}`)
          break
        } case 4: {
          const name = `criterionediting${++this.n}`
          const com = await asyncCriterionEditing(name)
          this.$router.addRoute({ path: `/${name}`, component: com })
          this.PUSH_TAG({ tag: `/${name}` })
          this.$router.push(`/${name}`)
          break
        }
      }

    },

    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'PUSH_TAG'
    ]),
    screenFull() {
      if (!screenfull.isEnabled) {
        this.$message({ message: '你的浏览器不支持全屏', type: 'warning' })
        return false
      }
      screenfull.toggle();
    },
    debug() {
      console.log('debug');
    }
  },
  computed: {
    ...mapState({
      isOpened: state => state.app.sidebar.isOpened
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.nav-container {
  width: 100vw;
  height: $navbarHeight;
}
// 清除element-ui navbar默认样式




</style>
