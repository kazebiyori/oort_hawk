<template>
  <div>

    <!-- 侧边栏-固定 -->
    <div class="sidebar-fix" @click="TOGGLE_SIDEBAR">
      <Icon class="sidebar-icon" type="md-code" />
    </div>

    <!-- 侧边栏-数据 -->
    <div :class="{ 'sidebar-active': showDataList, 'sidebar-close': !showDataList }">
      <div class="op-container">
        <el-icon @click="TOGGLE_FILTER" class="icon-right" :size="20" :class="{ 'icon-active': showFilter }">
          <Filter />
        </el-icon>
        <el-icon class="icon-right" :size="20">
          <CloseBold />
        </el-icon>
        <img src="@/assets/plane.svg" alt="#" class="plane-icon icon-left">
        <img src="@/assets/plane.svg" alt="#" class="plane-icon icon-left" style="transform:rotate(90deg)">
        <el-icon class="icon-left" :size="20">
          <Sort />
        </el-icon>
      </div>

      <div class="datalist"><DataList></DataList></div>

    </div>

    <!-- 侧边栏-过滤 -->
    <div :class="{ 'filter-panel-active': showDataList, 'filter-panel-close': !showDataList || !showFilter, }">
      <DataFilter></DataFilter>
    </div>

  </div>



</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { DataList, DataFilter } from '@/components/index.js'

export default {
  computed: {
    ...mapState({
      showDataList: state => state.app.sidebar.showDataList,
      showFilter: state => state.app.sidebar.showFilter,
    }),
  },
  methods: {
    ...mapMutations([
      'TOGGLE_SIDEBAR',
      'TOGGLE_FILTER'
    ]),
  },
  components: {
    DataList,
    DataFilter
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.datalist {
  overflow: auto;
  width: $sidebarActiveWidth;
  height: $sidebarDatalistHeight;
}

.plane-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.sidebar-icon {
  position: absolute;
  margin: auto;
  top: 50%;

}

.op-container {
  margin: 10px;
  overflow: hidden;
  height: $sidebarOpContainerHeight;

}

.icon-left {
  cursor: pointer;
  float: left;
  margin-right: 3px;
  box-sizing: content-box;
  padding: 0px;

  &:hover {
    background-color: $iconSelected;
    border-radius: 3px;

  }
}

.icon-right {
  cursor: pointer;
  float: right;
  margin-left: 3px;
  box-sizing: content-box;
  padding: 0px;

  &:hover {
    background-color: $iconSelected;
    border-radius: 3px;

  }
}

.icon-active {
  background-color: $iconSelected;
  border-radius: 3px;
}

.sidebar-fix {
  width: $sidebarFixedWidth;
  display: inline-block;
  height: $sidebarHeight;
  overflow: hidden;
  border: $borderStyle;

  cursor: pointer;

}

.sidebar-active {
  border: $borderStyle;


  width: $sidebarActiveWidth;
  height: $sidebarHeight;

  transition: width $animationTime;
  display: inline-block;
  overflow: hidden;
}

.sidebar-close {
  width: 0;
  transition: width $animationTime;
  height: $sidebarHeight;
  display: inline-block;
  overflow: hidden;

}

.filter-panel-active {
  position: absolute;
  top: $navbarHeight;
  left: $sidebarFixedWidth+$sidebarActiveWidth;
  z-index: 100;
  width: $sidebarFilterPanelWidth;
  height: $sidebarHeight;

  background-color: white;
  border: $borderStyle;


}

.filter-panel-close {
  position: absolute;
  top: $navbarHeight;
  left: $sidebarFixedWidth+$sidebarActiveWidth;
  z-index: 100;
  height: $sidebarHeight;

  background-color: white;
  border: 0px solid black;

  width: 0;
  overflow: hidden;
}
</style>