<template>
  <div class="item">
    <div class="left">
      <label>{{ itemData.label }}</label>
      <br>
      <img src="@/assets/plane.svg" alt="飞机">
    </div>

    <div class="right">
      <label style="color:#5191EB;font-size:x-large">{{ itemData.name }}</label> <label>编号：<l style="color:#5191EB;">
          {{ itemData.number }}</l>
      </label>

      <Row justify="start">
        <Col span="10">发动机型号：{{ itemData.typeEngine }}</Col>
        <Col span="14">发动机编号：{{ itemData.numberEngine }}</Col>
      </Row>
      <Row justify="start">
        <Col span="10"><span>试飞类型：</span><span :style="{ 'color': itemData.typeTrial == '启动' ? 'red' : '' }">{{
            itemData.typeTrial
        }}</span></Col>
        <Col span="14">试飞时间：{{ itemData.dateTrial }}</Col>
      </Row>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch, defineProps, computed } from 'vue';

const props = defineProps(['itemData'])

</script>


<style lang="scss" scoped>
.red {
  color: red
}

img {
  width: 40px;
  position: relative;
  //top: 3px;
}

.item {
  border: 1px solid pink;
  margin: 10px;


  & .left {
    text-align: center;
    display: inline-block;
    margin: 5px auto;

    width: 25%;
    height: 100%;
  }

  & .right {
    display: inline-block;
    text-align: center;

    //vertical-align: top;
    width: 75%;

    margin: 5px auto;
  }


}

:deep(p) {
  margin: 5px;
}
</style>
