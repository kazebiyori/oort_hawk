<template>
  <div class="nav-container">
    <div class="nav-bar">
      <div class="item-info"> </div>
      <div class="item" @click="addTag(1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-database">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
        数据展示
      </div>
      <div class="item" @click="addTag(2)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-bar-chart-2">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        数据统计
      </div>
      <div class="item" @click="addTag(3)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-pie-chart">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
        数据判读
      </div>
      <div class="item" @click="addTag(4)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-edit">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>判据编辑
      </div>
      <div class="item" @click="addTag(5)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-upload">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        数据上传
      </div>
      <User class="item-user" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { asyncDataStatistics, asyncDataDisplay, asyncDataCriterion, asyncCriterionDisplay } from '@/utils/asyncComponents.js'
import tinykeys from "tinykeys";
import User from '@/components/User.vue'

import color from '@/styles/color.module.scss';

export default {
  data() {
    return {
      n: 1,
      activeIndex: 1,
      color: color,
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
          const name = `criteriondisplay${++this.n}`
          const com = await asyncCriterionDisplay(name)
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
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/navbar.scss';



.nav-bar {
  display: flex;
  justify-content: start;
  align-items: center;

  font-size: 18px;
  user-select: none;

  background-color: #333333;
  color: #D1D2D2;

  border-bottom: 1px solid #000000;

  .item-info {
    width: $sidebarActiveWidth;
    height: $navbarHeight;
  }

  .item-user {
    margin-left: auto;
    margin-right: 60px;
    width: $navbarHeight;
    height: $navbarHeight;
  }

  .item {
    height: $navbarHeight;

    word-break: keep-all;

    width: 8rem;

    overflow: visible;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: red;
      font-size: 19px;
    }
  }

}
</style>
