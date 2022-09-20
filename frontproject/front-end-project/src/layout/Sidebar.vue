<template>
  <div class="sidebar-wrapper">
    <!-- 侧边栏-固定 -->
    <MyButton class="sidebar-fix" @click="TOGGLE_SIDEBAR"></MyButton>

    <!-- 侧边栏-数据 -->
    <div :class="{ 'sidebar-active': showDataList, 'sidebar-close': !showDataList }">
      <div class="op-container">
        <div class="op-left">
          <MyButton @click="groupByPlaneType" title="根据飞机类型分组">
            <svg viewBox=" 0 0 1121 1024" width="15">
              <path
                d="M700.065799 373.027761q116.507301 104.243374 209.508743 189.068865 39.857761 35.769785 77.671534 71.028574t67.451595 63.36362 47.522715 47.011718 17.884893 21.972868l0 61.319632q0 4.087975-17.884893-1.532991t-47.522715-17.373896-67.451595-27.593834-77.671534-33.214801q-93.001442-40.879755-209.508743-95.04543l0 193.156841q26.571841 19.417883 50.077699 37.813773 20.439877 15.329908 40.879755 30.148819t31.68181 22.994862q13.28592 9.197945 15.329908 18.906887t2.043988 22.994862l0 34.747791q0 8.175951-16.862899 10.730936t-40.368758-8.686948q-11.241933-6.131963-40.879755-18.39589t-63.36362-26.571841-64.896611-26.571841-46.500721-18.39589q-2.043988 0-3.576979-0.510997t-3.576979-0.510997-3.576979 0.510997-3.576979 0.510997q-15.329908 6.131963-46.500721 18.39589t-64.896611 26.571841-63.36362 26.571841-40.879755 18.39589q-23.505859 11.241933-40.368758 8.686948t-16.862899-10.730936l0-34.747791q0-13.28592 2.043988-22.994862t15.329908-18.906887q11.241933-8.175951 31.68181-22.994862t40.879755-30.148819q23.505859-18.39589 50.077699-37.813773l0-193.156841q-117.529295 54.165675-210.530737 95.04543-39.857761 17.373896-77.160537 33.214801t-66.940598 27.593834-47.522715 17.373896-17.884893 1.532991l0-61.319632q0-3.065982 17.884893-21.972868t47.522715-47.011718 66.940598-63.36362 77.160537-71.028574q93.001442-84.825491 210.530737-189.068865l0-231.992608q0-34.747791 10.219939-58.764647t25.549847-39.346764 33.214801-23.505859 33.725798-12.263926 26.060844-4.598972 11.241933-0.510997l10.219939 0q11.241933 1.021994 27.082837 5.109969t33.725798 12.263926 33.214801 23.505859 25.549847 39.346764 10.219939 58.764647l0 231.992608z"
                p-id="2516" fill="#8c8c8c"></path>
            </svg>
          </MyButton>
          <MyButton @click="groupByEngineType" title="根据左引擎类型分组">
            <svg viewBox=" 0 0 1121 1024" width="15" style="transform:rotate(-90deg)">
              <path
                d="M700.065799 373.027761q116.507301 104.243374 209.508743 189.068865 39.857761 35.769785 77.671534 71.028574t67.451595 63.36362 47.522715 47.011718 17.884893 21.972868l0 61.319632q0 4.087975-17.884893-1.532991t-47.522715-17.373896-67.451595-27.593834-77.671534-33.214801q-93.001442-40.879755-209.508743-95.04543l0 193.156841q26.571841 19.417883 50.077699 37.813773 20.439877 15.329908 40.879755 30.148819t31.68181 22.994862q13.28592 9.197945 15.329908 18.906887t2.043988 22.994862l0 34.747791q0 8.175951-16.862899 10.730936t-40.368758-8.686948q-11.241933-6.131963-40.879755-18.39589t-63.36362-26.571841-64.896611-26.571841-46.500721-18.39589q-2.043988 0-3.576979-0.510997t-3.576979-0.510997-3.576979 0.510997-3.576979 0.510997q-15.329908 6.131963-46.500721 18.39589t-64.896611 26.571841-63.36362 26.571841-40.879755 18.39589q-23.505859 11.241933-40.368758 8.686948t-16.862899-10.730936l0-34.747791q0-13.28592 2.043988-22.994862t15.329908-18.906887q11.241933-8.175951 31.68181-22.994862t40.879755-30.148819q23.505859-18.39589 50.077699-37.813773l0-193.156841q-117.529295 54.165675-210.530737 95.04543-39.857761 17.373896-77.160537 33.214801t-66.940598 27.593834-47.522715 17.373896-17.884893 1.532991l0-61.319632q0-3.065982 17.884893-21.972868t47.522715-47.011718 66.940598-63.36362 77.160537-71.028574q93.001442-84.825491 210.530737-189.068865l0-231.992608q0-34.747791 10.219939-58.764647t25.549847-39.346764 33.214801-23.505859 33.725798-12.263926 26.060844-4.598972 11.241933-0.510997l10.219939 0q11.241933 1.021994 27.082837 5.109969t33.725798 12.263926 33.214801 23.505859 25.549847 39.346764 10.219939 58.764647l0 231.992608z"
                p-id="2516" fill="#8c8c8c"></path>
            </svg>
          </MyButton>
          <MyButton @click="groupByEngineType2" title="根据右引擎类型分组">
            <svg viewBox=" 0 0 1121 1024" style="transform:rotate(90deg)" width="15">
              <path
                d="M700.065799 373.027761q116.507301 104.243374 209.508743 189.068865 39.857761 35.769785 77.671534 71.028574t67.451595 63.36362 47.522715 47.011718 17.884893 21.972868l0 61.319632q0 4.087975-17.884893-1.532991t-47.522715-17.373896-67.451595-27.593834-77.671534-33.214801q-93.001442-40.879755-209.508743-95.04543l0 193.156841q26.571841 19.417883 50.077699 37.813773 20.439877 15.329908 40.879755 30.148819t31.68181 22.994862q13.28592 9.197945 15.329908 18.906887t2.043988 22.994862l0 34.747791q0 8.175951-16.862899 10.730936t-40.368758-8.686948q-11.241933-6.131963-40.879755-18.39589t-63.36362-26.571841-64.896611-26.571841-46.500721-18.39589q-2.043988 0-3.576979-0.510997t-3.576979-0.510997-3.576979 0.510997-3.576979 0.510997q-15.329908 6.131963-46.500721 18.39589t-64.896611 26.571841-63.36362 26.571841-40.879755 18.39589q-23.505859 11.241933-40.368758 8.686948t-16.862899-10.730936l0-34.747791q0-13.28592 2.043988-22.994862t15.329908-18.906887q11.241933-8.175951 31.68181-22.994862t40.879755-30.148819q23.505859-18.39589 50.077699-37.813773l0-193.156841q-117.529295 54.165675-210.530737 95.04543-39.857761 17.373896-77.160537 33.214801t-66.940598 27.593834-47.522715 17.373896-17.884893 1.532991l0-61.319632q0-3.065982 17.884893-21.972868t47.522715-47.011718 66.940598-63.36362 77.160537-71.028574q93.001442-84.825491 210.530737-189.068865l0-231.992608q0-34.747791 10.219939-58.764647t25.549847-39.346764 33.214801-23.505859 33.725798-12.263926 26.060844-4.598972 11.241933-0.510997l10.219939 0q11.241933 1.021994 27.082837 5.109969t33.725798 12.263926 33.214801 23.505859 25.549847 39.346764 10.219939 58.764647l0 231.992608z"
                p-id="2516" fill="#8c8c8c"></path>
            </svg>
          </MyButton>

          <MyButton class="clear" @click="sortByPlaneTime" title="排序">
            <Sort width="15" />
          </MyButton>

          <!-- <MyButton class="clear" @click="clearGroup" title="清除分组">
            <CloseBold width="15" />
          </MyButton> -->
        </div>

        <div class="op-right">


          <MyButton class="" @click="TOGGLE_FILTER" title="过滤">
            <Filter width="15" />
          </MyButton>
        </div>

      </div>

      <div class="datalist"><DataList></DataList></div>
    </div>

    <!-- 侧边栏-过滤 -->
    <!-- <div :class="{ 'filter-panel-active': showDataList, 'filter-panel-close': !showDataList || !showFilter, }">
      <DataFilter></DataFilter>
    </div> -->
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
import MyButton from '@/components/MyButton.vue'

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

function groupByEngineType2() {
  emitter.emit("groupByEngineType2", {})
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
  margin-left: 5px;
}

.op-container {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin: 10px;
  height: $sidebarOpContainerHeight;

  .op-left {
    display: flex;
    gap: 5px;
  }

  .op-right {
    display: flex;
    justify-content: end;
    gap: 5px;
  }
}

.sidebar-fix {
  width: $sidebarFixedWidth;
  display: inline-block;
  height: $sidebarHeight;
  overflow: hidden;
  border: $borderStyle;

  // cursor: pointer;

  z-index: 100;
}

.sidebar-active {
  border: $borderStyle;

  width: $sidebarActiveWidth;
  height: $sidebarHeight;

  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: 3px 3px 5px #bebebe,
    -3px -3px -5px #ffffff;

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
  top: calc($navbarHeight + 1px);
  left: $sidebarFixedWidth+$sidebarActiveWidth;
  z-index: 100;
  width: $sidebarFilterPanelWidth;
  height: $sidebarHeight;

  //background-color: $sidebarFixColor;
  background-color: white;
  border: $borderStyle;

  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 3px 3px 5px #bebebe,
    -3px -3px -5px #ffffff;

  transition: width 0.1s;

  overflow: hidden;

}

.filter-panel-close {
  width: 0;

  border: none;

  transition: width 0.1s;
}

:deep(.select) {
  border: none !important;
}
</style>