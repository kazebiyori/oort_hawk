<template>
  <div>
    <!-- 收缩栏 -->
    <div class="foldicon">
      <svg t="1660553094186" width="25" height="25" class="left" viewBox="0 0 1024 1024" version="1.1"
        @click="OPEN_DATADISPLAYSELECTOR" xmlns="http://www.w3.org/2000/svg" p-id="10314"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <path
          d="M173 137c-19.882 0-36 16.118-36 36v680c0 19.882 16.118 36 36 36h678c19.882 0 36-16.118 36-36V173c0-19.882-16.118-36-36-36H173z m0-72h678c59.647 0 108 48.353 108 108v680c0 59.647-48.353 108-108 108H173c-59.647 0-108-48.353-108-108V173c0-59.647 48.353-108 108-108z m460.456 677.544c14.059 14.059 14.059 36.853 0 50.912-14.059 14.059-36.853 14.059-50.912 0l-256-256c-14.059-14.059-14.059-36.853 0-50.912l256-256c14.059-14.059 36.853-14.059 50.912 0 14.059 14.059 14.059 36.853 0 50.912L402.912 512l230.544 230.544z"
          p-id="10315" fill="#8a8a8a"></path>
      </svg>
      <svg t="1660553065871" class="right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        @click="CLOSE_DATADISPLAYSELECTOR" p-id="10041" xmlns:xlink="http://www.w3.org/1999/xlink" width="25"
        height="25">
        <path
          d="M173 137c-19.882 0-36 16.118-36 36v680c0 19.882 16.118 36 36 36h678c19.882 0 36-16.118 36-36V173c0-19.882-16.118-36-36-36H173z m0-72h678c59.647 0 108 48.353 108 108v680c0 59.647-48.353 108-108 108H173c-59.647 0-108-48.353-108-108V173c0-59.647 48.353-108 108-108z m435.088 447L377.544 281.456c-14.059-14.059-14.059-36.853 0-50.912 14.059-14.059 36.853-14.059 50.912 0l256 256c14.059 14.059 14.059 36.853 0 50.912l-256 256c-14.059 14.059-36.853 14.059-50.912 0-14.059-14.059-14.059-36.853 0-50.912L608.088 512z"
          p-id="10042" fill="#8a8a8a"></path>
      </svg>
    </div>

    <!-- 左边折线图 -->
    <div :class="{ 'leftboardWithselector': showSelector, 'leftboardWithoutselector': !showSelector }">
      <!-- <div class="title">折线图展示
      </div> -->
      <div id="chart" ref="chart" :style="{ width: '100%', height: '100%' }">
      </div>
    </div>

    <!-- 右边选择框 -->
    <div class="selector">
      <div :class="{ 'selector-open': showSelector, 'selector-close': !showSelector }">
        <span class="tips">
          已选择7项，展示3项
        </span>
        <div class="function-icon">
          <img src="../assets/看.svg" alt="#">
          <img src="../assets/删除.svg" alt="#">
          <img src="../assets/加.svg" alt="#">
        </div>

        <div class="selectboard">
          <el-color-picker v-model="color1" />
          <Select v-model="model" placeholder="数据A" class="data">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Cascader :data="data" v-model="value" placeholder="参数A" class="param" />
          <img src="../assets/删除.svg" alt="#">
          <img src="../assets/看.svg" alt="#">
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted, inject } from "vue"
import { useStore } from 'vuex'
import { EleResize } from '@/utils/esresize'// 图表自适应

import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  setFetchMethod
} from 'darkreader';

// 从根组件获取组件
const echarts = inject('$echarts')
// 获取图表dom组件
const chart = ref(null)
// 待初始化的日历对象
let myChart = null

// 获取事件总线
const emitter = inject("$emitter")

// vuex全局对象
const store = useStore();
let showSelector = computed(() => store.state.app.datadisplayselector.showSelector,)
const OPEN_DATADISPLAYSELECTOR = () => store.commit("OPEN_DATADISPLAYSELECTOR")
const CLOSE_DATADISPLAYSELECTOR = () => store.commit("CLOSE_DATADISPLAYSELECTOR")

// 数据选择列表
let color1 = ref('#19be6b')
let value = ref([])
let data = ref([{
  value: 'beijing',
  label: '北京',
  children: [
    {
      value: 'gugong',
      label: '故宫'
    }
  ]
}])
let cityList = ref([
  {
    value: 'Canberra',
    label: 'Canberra'
  }
])
let model = ref('')

// 数据图配置信息

let axisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
let seriesData = [{ name: '直接访问', data: [320, 302, 301, 334, 390, 330, 320] },
{ name: '邮件营销', data: [120, 132, 101, 134, 120, 230, 210] }];
let newData = [];
let legendData = [];
let option = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(231, 239, 255, 0.2)',
    axisPointer: {
      animation: false
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: 'all'
      }
    ]
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    },
    {
      type: 'inside',
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1]
    }
  ],
  grid: [
    {
      left: 60,
      right: 50,
      height: '75%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: { onZero: true },
      data: axisData
    }
  ],
  yAxis: [
    {
      name: 'value',
      type: 'value'
    }
  ],
  legend: {
    data: legendData,
    orient: 'horizontal',
  },
  series: newData
};


function serLineItem() {
  return {
    name: '',
    type: 'line',
    data: []
  }
}

// 图表初始化
function echartsInit() {
  {
    // 获取图表对象
    chart.value.focus()
    myChart = echarts.init(chart.value);
    // 图表自适应
    var listener = function () {
      myChart.resize()
    }
    EleResize.on(chart.value, listener)

    // 根据序列数据获取图例等信息
    for (let i = 0; i < seriesData.length; i++) {
      var lineItem = new serLineItem();
      lineItem.name = seriesData[i].name;
      legendData.push(seriesData[i].name);
      lineItem.data = seriesData[i].data;
      newData.push(lineItem);
    }

    // 设置图表数据
    option && myChart.setOption(option);

  }
}

onMounted(() => {
  echartsInit()
})

</script>
  
<style lang="scss" scoped>
@import '@/styles/variables.scss';

:deep(.ivu-cascader-menu) {
  min-width: 40px;
}

.leftboardWithselector {
  padding: 40px;
  padding-top: 0px;
  float: left;
  width: calc(100% - 350px);
  height: $dataDisplayHeight;
  // transition: 500ms;
}

.leftboardWithoutselector {
  padding: 40px;
  padding-top: 0px;

  float: left;
  width: 100%;
  height: $dataDisplayHeight;
  // transition: 500ms;
}

.title {
  height: 20px;
  border-bottom-color: gray;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  font-size: 20px;
  color: #000;
  line-height: 5px;
}

.selector-open {
  position: relative;
  float: right;
  width: 350px;
  height: $dataDisplayHeight;
  border: $borderStyle;
  padding: 10px;
}

.selector-close {
  float: right;
  width: 0px;
  height: $dataDisplayHeight;

}

img {
  width: 25px;
  height: 25px;
}

.function-icon {
  display: flex;
  justify-content: end;
  height: 30px;
  margin-bottom: 20px;
  margin-right: 0px;
  gap: 5px;

  & img:hover {
    background-color: $iconSelected;
    border-radius: 3px;
    cursor: pointer;
  }
}



.foldicon {
  margin: 10px;
  display: flex;
  justify-content: end;
  gap: 5px;

  .left {
    cursor: pointer;

    &:hover {
      background-color: $iconSelected;
      border-radius: 3px;
    }
  }

  .right {
    cursor: pointer;

    &:hover {
      background-color: $iconSelected;
      border-radius: 3px;
    }
  }
}

.selectboard {
  margin-top: 5px;
  display: flex;
  gap: 5px;

  .data {
    flex: 1;
  }

  .param {
    flex: 1;
  }
}

.tips {
  float: left;
  position: relative;
  top: 4px;
  left: 3px;
}
</style>
  