<template>
  <div class="sidebar-wrapper">
    <!-- 侧边栏-固定 -->
    <div class="sidebar-fix" @click="TOGGLE_SIDEBAR">
      <Icon class="sidebar-icon" type="md-code" />
    </div>

    <!-- 侧边栏-数据 -->
    <div :class="{ 'sidebar-active': showDataList, 'sidebar-close': !showDataList }">
      <div class="op-container">
        <el-icon @click="TOGGLE_FILTER" class="icon-right" :size="20" :class="{ 'icon-active': showFilter }"
          title="显示过滤面板">
          <Filter />
        </el-icon>
        <el-icon class="icon-right" :size="20" title="清除分组" @click="clearGroup">
          <CloseBold />
        </el-icon>

        <img src="@/assets/plane.svg" alt="#" class="plane-icon icon-left" title="根据飞机类型分组" @click="groupByPlaneType">
        <img src="@/assets/plane.svg" alt="#" class="plane-icon icon-left" style="transform:rotate(90deg)"
          @click="groupByEngineType" title="根据引擎类型分组">
        <el-icon class="icon-left" :size="20" title="排序" @click="sortByPlaneTime">
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

<script setup>
import { mapActions, mapMutations, mapState } from 'vuex'
import { useStore } from 'vuex'
import { inject, computed } from "vue"
import { DataList, DataFilter } from '@/components/index.js'

const emitter = inject("$emitter")
const store = useStore();

let showDataList = computed(() => store.state.app.sidebar.showDataList)
let showFilter = computed(() => store.state.app.sidebar.showFilter)

const TOGGLE_SIDEBAR = () => store.commit('TOGGLE_SIDEBAR')
const TOGGLE_FILTER = () => store.commit('TOGGLE_FILTER')

function groupByPlaneType() {
  emitter.emit("groupByPlaneType", {})
}

function groupByEngineType() {
  emitter.emit("groupByEngineType", {})
}
function sortByPlaneTime() {
  emitter.emit("sortByPlaneTime", {})
}
function clearGroup() {
  emitter.emit("clearGroup", {})
}


</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/color.module.scss';

.sidebar-wrapper {
  //background-color: $sidebarFixColor;
  user-select: none;
}


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

  //background-color: $sidebarFixColor;
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