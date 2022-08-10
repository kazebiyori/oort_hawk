<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b">

    <div class="flod-icon-container" @click="TOGGLE_SIDEBAR">
      <el-icon :size="30" class="flod-icon">
        <component :is="isOpened ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="flod-icon-container" @click="screenFull">
      <el-icon :size="30" class="flod-icon">
        <FullScreen />
      </el-icon>
    </div>
    <el-menu-item index="1" @click="addTag(1)">数据展示</el-menu-item>
    <el-menu-item index="2" @click="addTag(2)">数据统计</el-menu-item>
    <el-menu-item index="3" @click="addTag(3)">数据判读</el-menu-item>
    <el-menu-item index="4" @click="addTag(4)">编辑判据</el-menu-item>

  </el-menu>

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
@import '@/styles/a-my-variables.scss';

.flod-icon-container {
  width: 50px;

  &:hover {
    cursor: pointer;
  }

}

.flod-icon {
  display: block;
  margin: auto;
  margin-top: 13px;
}

take {
  background-color: red;
  width: 100vw-$sidebarWidth;
  height: 30px;
  overflow: auto;
}
</style>
