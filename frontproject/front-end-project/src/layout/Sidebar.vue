<template>
  <div>
    <div class="sidebar-fix" @click="TOGGLE_SIDEBAR">
    </div>

    <div :class="{ 'active': showDataList, 'close': !showDataList }">
      <!-- {{ dataList }} -->
        <div class="op-container">
          <el-icon @click="TOGGLE_FILTER" class="icon-right" :size="20" :class="{'icon-active':showFilter}">
            <Filter />
          </el-icon>

          <el-icon class="icon-right" :size="20">
            <Sort />
          </el-icon>
      </div>

      <DataList></DataList>
    </div>

<!-- filter-panel的三种变化状态 :  -->
<!-- sidebar展开时的  收缩、展开 -->
<!-- sidebar 的收缩、展开 -->
    <div :class="{ 'filter-panel-active': showDataList, 'filter-panel-close': !showDataList || !showFilter,}">
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

.op-container {
  margin: 10px;
  overflow: hidden;
}

.icon-left {
  cursor: pointer;
  float: left;
}

.icon-right {
  cursor: pointer;
  float: right;
  margin-left: 3px;
  box-sizing: content-box;
  padding:5px;
}

.icon-active{
  background-color: antiquewhite;
  border-radius: 3px;
}

.sidebar-fix {
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

  transition: width $animationTime;
  display: inline-block;
  overflow: hidden;
}

.close {
  width: 0;
  transition: width $animationTime;
  height: $sidebarHeight;
  display: inline-block;
  overflow: hidden;

}

.filter-panel-active{
    position: absolute;
    top: $navbarHeight;
    left: $sidebarFixedWidth+$sidebarActiveWidth;
    z-index: 100;
    width: $sidebarFilterPanelWidth;
    height: $sidebarHeight;

    background-color: white;
    border: 1px solid black;

}

.filter-panel-close{
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