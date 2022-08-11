<template>
  <div>
    <div class="fix" @click="TOGGLE_SIDEBAR">
      <!-- <el-icon :size="30" class="flod-icon">
        <component :is="isOpened ? 'Fold' : 'Expand'"></component>
      </el-icon> -->
    </div>

    <div :class="{ 'active': isOpened, 'close': !isOpened }">
      <!-- {{ dataList }} -->
      <DataList></DataList>
    </div>

  </div>



</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { DataList } from '@/components/index.js'

export default {
  computed: {
    ...mapState({
      isOpened: state => state.app.sidebar.isOpened,
    }),
  },
  methods: {
    ...mapMutations([
      'TOGGLE_SIDEBAR',
    ]),
  },
  components: {
    DataList
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

.flod-icon {
  display: block;
  margin: auto;
  margin-top: 13px;
}

.fix {
  width: $sidebarFixedWidth;
  display: inline-block;
  background-color: #007;
  height: $sidebarHeight;

  cursor: pointer;

}

.active {


  border: 1px solid black;

  width: $sidebarActiveWidth;
  height: $sidebarHeight;

  transition: width 0.2s;
  display: inline-block;
  overflow: hidden;
}

.close {
  width: 0;
  transition: 0.2s;
  height: $sidebarHeight;
  display: inline-block;
  overflow: hidden;

}
</style>