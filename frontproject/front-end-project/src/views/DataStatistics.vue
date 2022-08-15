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

          </TabPane>
        </Tabs>

        <div class="select-container">
          <label>飞机编号：</label>
          <Select class='select' v-model="selectItem" style="width: 120px">
            <Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
      </div>

      <div class="top-right">
        <Calendar />
      </div>

    </div>
    <div class="bottom">

      <div class="bottom-left">
        左
      </div>

      <div class="bottom-right">右</div>
    </div>
  </div>
</template>

<script setup>

import Calendar from './components/Calendar.vue';
import { ref, computed } from 'vue';


let selectListID = ref(0)
let selectLists = ref([['路径', '路灯', '草坪'], ['夕阳', '背影'], ['海', '自行车', '红蓝']])

const selectItem = ref('')

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
  display: inline-block;
  border: $borderStyle;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: $dataDisplayTopLeftWidth;
  height: $dataDisplayTopLeftHeight;


  overflow: hidden;
}

.top-right {
  display: inline-block;
  border: $borderStyle;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: calc(100% - $dataDisplayTopLeftWidth);
  height: 400px;
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
