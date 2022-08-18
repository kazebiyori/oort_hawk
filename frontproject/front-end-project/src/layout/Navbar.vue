<template>
  <div class="nav-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="addTag(1)">数据展示</el-menu-item>
      <el-menu-item index="2" @click="addTag(2)">数据统计</el-menu-item>
      <el-menu-item index="3" @click="addTag(3)">数据判读</el-menu-item>
      <el-menu-item index="4" @click="addTag(4)">编辑判据</el-menu-item>
      <el-menu-item index="5" @click="addTag(5)">数据上传</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex'

import { asyncDataStatistics, asyncDataDisplay, asyncDataCriterion, asyncCriterionEditing } from '@/utils/asyncComponents.js'

import tinykeys from "tinykeys";


export default {
  data() {
    return {
      n: 1,
      activeIndex: 1
    }
  },
  created() {
    tinykeys(window, {
      "Shift+N": () => {
        this.addTag(this.activeIndex)
      },
      "Shift+Digit1": () => {
        this.addTag(1)
      },
      "Shift+Digit2": () => {
        this.addTag(2)
      },
      "Shift+Digit3": () => {
        this.addTag(3)
      },
      "Shift+Digit4": () => {
        this.addTag(4)
      },
    });
  },
  methods: {
    async addTag(id) {
      this.activeIndex = id
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
        } case 5: {
          // 数据上传不添加标签页
          // this.PUSH_TAG({ tag: 'dataupload' })
          this.$router.push('/dataupload')
        }
      }

    },

    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'PUSH_TAG'
    ]),
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

:deep(.el-menu-item) {
  font-size: 20px;
}

.nav-container {
  width: 100vw;
  height: $navbarHeight;
}

// 清除element-ui navbar默认样式
</style>
