<template>
  <div class="div">
    <!-- 左边折线图 -->
    <div class="leftboard">
      <div class="linechart">
        <div class="title">折线图展示
        </div>
        <div class="body">
          <div class="picture" id="datadisplaypicture">

          </div>
        </div>
      </div>
    </div>
    <!-- 右边选择框 -->
    <div class="selector">

      <div class="foldicon">
        <img src="@/assets/left.svg" alt="#" class="left" @click="OPEN_DATADISPLAYSELECTOR">
        <img src="@/assets/right.svg" alt="#" class="right" @click="CLOSE_DATADISPLAYSELECTOR">
      </div>
      <div :class="{ 'selector-open': showSelector, 'selector-close': !showSelector }">
        <div class="tips">
          已选择7项，展示3项
          <hr>
        </div>
        <div class="DataPickerOp">

          <el-icon :size="iconSize" class="icon">
            <Delete />
          </el-icon>
          <el-icon :size="iconSize" class="icon">
            <View />
          </el-icon>
          <el-icon :size="iconSize" class="icon">
            <Plus />
          </el-icon>


        </div>
        <div class="selectboard">
          <DataPickItem></DataPickItem>


        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import { useStore } from 'vuex';

import DataPickItem from './components/DataPickItem.vue';

const iconSize = 20

// 从根组件获取echarts组件
const echarts = inject('$echarts')
// 待初始化的日历对象
let myChart = null
// 获取全局状态
const store = useStore()
const showSelector = computed(() => store.state.app.datadisplayselector.showSelector)
const OPEN_DATADISPLAYSELECTOR = () => { store.commit('OPEN_DATADISPLAYSELECTOR') }
const CLOSE_DATADISPLAYSELECTOR = () => { store.commit('CLOSE_DATADISPLAYSELECTOR') }

// echarts数据信息
const color1 = '#19be6b'
const value = []
const data = [{
  value: 'beijing',
  label: '北京',
  children: [
    {
      value: 'gugong',
      label: '故宫'
    },
    {
      value: 'tiantan',
      label: '天坛'
    },
    {
      value: 'wangfujing',
      label: '王府井'
    }
  ]
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [
    {
      value: 'nanjing',
      label: '南京',
      children: [
        {
          value: 'fuzimiao',
          label: '夫子庙',
        }
      ]
    },
    {
      value: 'suzhou',
      label: '苏州',
      children: [
        {
          value: 'zhuozhengyuan',
          label: '拙政园',
        },
        {
          value: 'shizilin',
          label: '狮子林',
        }
      ]
    }
  ],
}];
const cityList = [
  {
    value: 'New York',
    label: 'New York'
  },
  {
    value: 'London',
    label: 'London'
  },
  {
    value: 'Sydney',
    label: 'Sydney'
  },
  {
    value: 'Ottawa',
    label: 'Ottawa'
  },
  {
    value: 'Paris',
    label: 'Paris'
  },
  {
    value: 'Canberra',
    label: 'Canberra'
  }
]
const model = ''
// echarts配置信息
let chartOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    itemSize: 25,
    itemGap: 10,
    orient: 'vertical',
    feature: {

      dataZoom: {
        icon: {
          zoom: "path:M 926.72 829.44 q 28.672 32.768 31.232 57.344 t -18.944 48.128 q -24.576 27.648 -54.272 26.112 t -57.344 -24.064 l -164.864 -158.72 q -46.08 30.72 -99.84 47.616 t -113.152 16.896 q -80.896 0 -151.552 -30.72 t -123.392 -83.456 t -82.944 -123.392 t -30.208 -151.552 q 0 -79.872 30.208 -150.528 t 82.944 -123.392 t 123.392 -83.456 t 151.552 -30.72 t 151.552 30.72 t 123.392 83.456 t 83.456 123.392 t 30.72 150.528 q 0 61.44 -17.92 116.736 t -49.664 101.376 q 13.312 14.336 37.376 38.4 t 48.128 48.64 t 44.544 44.032 Z M 449.536 705.536 q 53.248 0 100.352 -19.968 t 81.92 -54.784 t 54.784 -81.92 t 19.968 -100.352 t -19.968 -100.352 t -54.784 -81.92 t -81.92 -54.784 t -100.352 -19.968 t -99.84 19.968 t -81.408 54.784 t -55.296 81.92 t -20.48 100.352 t 20.48 100.352 t 55.296 81.92 t 81.408 54.784 t 99.84 19.968 Z M 512 384 l 128 0 l 0 128 l -128 0 l 0 128 l -129.024 0 l 0 -128 l -126.976 0 l 0 -128 l 126.976 0 l 0 -128 l 129.024 0 l 0 128 Z",
          back: "path:M 469.333 192 c 153.173 0 277.333 124.16 277.333 277.333 c 0 68.0533 -24.5333 130.411 -65.216 178.688 l 164.885 170.219 l -48.3413 49.8773 l -167.595 -172.992 A 276.053 276.053 0 0 1 469.333 746.667 c -153.173 0 -277.333 -124.16 -277.333 -277.333 S 316.16 192 469.333 192 Z m 0 64 c -117.824 0 -213.333 95.5093 -213.333 213.333 s 95.5093 213.333 213.333 213.333 s 213.333 -95.5093 213.333 -213.333 s -95.5093 -213.333 -213.333 -213.333 Z m 133.184 192 v 64 H 341.333 v -64 h 261.184 Z"
        },
        iconStyle: {
          color: "#8c8c8c",
          borderColor: "#8c8c8c",
        },
      },
      saveAsImage: {
        icon: "path:M 269.44 256 l 23.296 -75.3813 A 74.6667 74.6667 0 0 1 364.075 128 h 295.851 a 74.6667 74.6667 0 0 1 71.3387 52.6187 L 754.56 256 H 821.333 c 64.8 0 117.333 52.5333 117.333 117.333 v 426.667 c 0 64.8 -52.5333 117.333 -117.333 117.333 H 202.667 c -64.8 0 -117.333 -52.5333 -117.333 -117.333 V 373.333 c 0 -64.8 52.5333 -117.333 117.333 -117.333 h 66.7733 Z m 23.6053 64 H 202.667 a 53.3333 53.3333 0 0 0 -53.3333 53.3333 v 426.667 a 53.3333 53.3333 0 0 0 53.3333 53.3333 h 618.667 a 53.3333 53.3333 0 0 0 53.3333 -53.3333 V 373.333 a 53.3333 53.3333 0 0 0 -53.3333 -53.3333 h -90.3787 a 32 32 0 0 1 -30.5707 -22.5493 l -30.272 -97.9307 a 10.6667 10.6667 0 0 0 -10.1867 -7.52 H 364.075 a 10.6667 10.6667 0 0 0 -10.1867 7.52 l -30.272 97.92 A 32 32 0 0 1 293.045 320 Z M 512 725.333 c -88.3627 0 -160 -71.6373 -160 -160 c 0 -88.3627 71.6373 -160 160 -160 c 88.3627 0 160 71.6373 160 160 c 0 88.3627 -71.6373 160 -160 160 Z m 0 -64 a 96 96 0 1 0 0 -192 a 96 96 0 0 0 0 192 Z",
        iconStyle: {
          color: "#8c8c8c",
          borderColor: "#8c8c8c",
        }
      },

    }
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 35,
      backgroundColor: 'rgba(47, 69, 84, 0)',

    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      color: "#007",
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
      color: "#707"
    }
  ]


}

// 挂载时初始化图表
onMounted(() => {
  // 将变量与html中div关联
  myChart = echarts.init(document.getElementById('datadisplaypicture'))
  // 配置图表内容
  myChart.setOption(chartOption)
})


// 图表适应宽度变化
window.onresize = function () {
  myChart.resize();
};


</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.div {
  width: $mainWithSideWidth;
  height: $mainWithoutSideWidth;
  margin-top: 10px;
}

.leftboard {
  float: left;
  width: calc($mainWithSideWidth - $datadispalyslectorWith);
  height: $mainbottomHeight;
  border-left-color: aqua;
  border-left-width: 2px;
  border-left-style: solid;
}

.leftboard .linechart {
  float: left;
  width: $datadispalyleftbodypictureWidth;
  height: $mainbottomHeight;
  margin-left: 30px;
  padding-top: 25px;
}

.leftboard .linechart .title {
  height: 50px;
  border-bottom-color: gray;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  font-size: 20px;
  color: #000;
  line-height: 50px;
}

.leftboard .linechart .body {
  height: $datadispalyleftbodyHeihgt ;
}

.leftboard .linechart .body .picture {
  vertical-align: top;
  display: inline-block;
  width: $datadispalyleftbodypictureWidth;
  height: $datadispalyleftbodyHeihgt ;
}

.selector-open {
  float: right;
  width: $datadispalyslectorWith;
  height: calc($mainbottomHeight - 20vh);
  border-left-color: aqua;
  border-left-width: 2px;
  border-left-style: solid;
}

.selector-close {
  float: right;
  width: 0px;
  height: calc($mainbottomHeight - 20vh);
  border-left-color: aqua;
  border-left-width: 2px;
  border-left-style: solid;
  opacity: 0;
}

.selector .functionicon {
  margin-left: calc($datadispalyslectorWith - 160px);
  margin-top: 10px;
}

img {
  width: 30px;
  height: 25px;
}

.selector .foldicon .left {
  display: inline-block;
  margin-left: calc($datadispalyslectorWith - 100px);
  cursor: pointer;

  &:hover {
    background-color: $iconSelected;
    border-radius: 3px;

  }
}

.selector .foldicon .right {
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: $iconSelected;
    border-radius: 3px;

  }
}

.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.selectboard {
  margin-top: 20px;
}

.selectboard .selectedlist {
  margin-top: 10px;
}

.selectboard .selectedlist div {
  display: inline-block;
  vertical-align: top;
  margin-left: 4px;
}
</style>
