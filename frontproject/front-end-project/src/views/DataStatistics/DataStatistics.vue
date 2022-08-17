<template>
  <div class="data-display-container">
    <div class="top">
      <div class="top-left">
        <Tabs>
          <TabPane label="飞机" icon="ios-bowtie">
            <Carousel v-model="selectListID" scroll>
              <CarouselItem>
                <img src="@/assets/img/像素-街角.png" alt="街角">
              </CarouselItem>
              <CarouselItem>
                <img src="@/assets/img/像素-夕阳.jpeg" alt="夕阳">
              </CarouselItem>
              <CarouselItem>
                <img src="@/assets/img/像素-草坪.jpeg" alt="草坪">
              </CarouselItem>
            </Carousel>
          </TabPane>

          <TabPane label="发动机" icon="ios-bowtie-outline">
            <Carousel v-model="selectListID2" scroll>
              <CarouselItem>
                <img src="@/assets/img/像素-街角.png" alt="街角">
              </CarouselItem>
              <CarouselItem>
                <img src="@/assets/img/像素-夕阳.jpeg" alt="夕阳">
              </CarouselItem>
            </Carousel>
          </TabPane>
        </Tabs>

        <div class="select-container">

          <Tooltip placement="bottom-start" :delay="500" theme="light" transfer="true">
            <label sytle="cursor: pointer;">飞机编号：</label>
            <template #content>
              <p>                                          </p>
              <Table border :columns="columns" :data="data" width="500px"></Table>
            </template>
          </Tooltip>

          <Select v-model="selectItem" style="width: 120px" default-label="路径">
            <Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
      </div>

      <div class="top-right">
        <Calendar @dayChange="dayChange" />
      </div>

    </div>
    <div class="bottom">
      <div class="bottom-left">

      </div>
      <div class="bottom-right">
        <LineChart :startDate="startDate" :endDate="endDate"></LineChart>
      </div>
    </div>
  </div>
</template>

<script setup>

import Calendar from './components/Calendar.vue';
import LineChart from './components/LineChart.vue';
import { getFormatDay } from '@/utils/date';

import { ref, computed, watch } from 'vue';

// 数据统计起止时间
let startDate = ref('')
let endDate = ref('')
watch(startDate, (newVal) => {

})
function dayChange(payload) {
  startDate.value = getFormatDay(payload[0])
  endDate.value = getFormatDay(payload[1])
}

// 鼠标悬停，显示缩略信息
const columns = ref([
  {
    title: '参数',
    key: 'param'
  },
  {
    title: '数值',
    key: 'value'
  }
])
const data = ref([
  {
    param: '飞机编号',
    value: 1
  }, {
    param: '试车类型',
    value: 'AAA'
  }, {
    param: 'xxx',
    value: 'xxx'
  },

])

// 轮播图信息
let selectListID = ref(0)
let selectListID2 = ref(0)
let selectLists = ref([['路径', '路灯', '草坪'], ['夕阳', '背影'], ['海', '自行车', '红蓝']])

const selectItem = ref('init')

let selectList = computed(() => {
  return selectLists.value[selectListID.value]
})



</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.data-display-container {
  height: $dataDisplayHeight;
  width: 100%
}

.top {
  border: $borderStyle;
  width: 100%;
  height: $dataDisplayTopHeight;
  overflow: hidden;
}

.bottom {
  border: $borderStyle;
  width: 100%;
  height: $dataDisplayBottomHeight;
}

.top-left {
  display: block;
  float: left;
  border: $borderStyle;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: $dataDisplayTopLeftWidth;
  height: $dataDisplayTopHeight;


  overflow: scroll;
}

.top-right {
  display: inline-block;
  border: $borderStyle;
  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: calc(100% - $dataDisplayTopLeftWidth);
  height: $dataDisplayTopHeight;
  overflow: auto;

}

.bottom-left {
  display: block;
  float: left;
  border: $borderStyle;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: $dataDisplayTopLeftWidth;
  height: $dataDisplayBottomHeight;


  overflow: scroll;
}

.bottom-right {
  display: inline-block;
  border: $borderStyle;
  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: calc(100% - $dataDisplayTopLeftWidth);
  height: $dataDisplayBottomHeight;
  overflow: scroll;

}

img {
  display: block;
  margin: auto;
  width: 250px;
  cursor: pointer;
}

.select-container {
  text-align: center;
  margin: 21px;
}

:deep(.ivu-select-single .ivu-select-selection) {
  height: 28px;
}
</style>
