<template>
  <div class="div">
    <div class="foldicon">
      <img src="../assets/left.svg" alt="#" class="left" @click="OPEN_DATADISPLAYSELECTOR">
      <img src="../assets/right.svg" alt="#" class="right" @click="CLOSE_DATADISPLAYSELECTOR">
    </div>
    <!-- 左边折线图 -->
    <div :class="{ 'leftboardWithselector': showSelector, 'leftboardWithoutselector': !showSelector }">
      <div class="title">折线图展示
      </div>

      <div class="picture" id="datadisplaypicture" ref="bar" :style="{ width: '100%', height: '100%' }">

      </div>
    </div>
    <!-- 右边选择框 -->
    <div class="selector">


      <div :class="{ 'selector-open': showSelector, 'selector-close': !showSelector }">
        <div class="tips">
          已选择7项，展示3项
          <hr>
        </div>
        <div class="functionicon">
          <img src="../assets/加.svg" alt="#">
          <img src="../assets/多选框.svg" alt="#">
          <img src="../assets/重做.svg" alt="#">
          <img src="../assets/删除.svg" alt="#">
        </div>
        <div class="selectboard">
          <div class="selectedlist">
            <div class="demo-color-block">
              <el-color-picker v-model="color1" />
            </div>
            <div class="dataselect">
              <Select v-model="model" style="width:80px" placeholder="数据A">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

            </div>
            <div class="parameterselect">
              <Cascader :data="data" v-model="value" v-width="80" placeholder="参数A" />
            </div>

            <div class="eye">
              <img src="../assets/看.svg" alt="#">
            </div>
            <div class="deleteself">
              <img src="../assets/删除.svg" alt="#">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Datadisplay } from '.'
import { mapActions, mapMutations, mapState } from 'vuex';
import { nextTick } from 'vue';
// import { Datadisplayselector } from '@/components/index.js'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
//dataZoom
import 'echarts/lib/component/dataZoom';
// 用于监听父元素变化
// import elementResizeDetectorMaker from "element-resize-detector"
import { EleResize } from '@/utils/esresize'// 图表自适应

// 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);


export default {
  name: 'Datadisplay',
  data() {
    return {
      color1: '#19be6b',
      value: [],
      data: [{
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
      }],
      cityList: [
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
      ],
      model: '',

    }
  },
  computed: {
    ...mapState({
      showSelector: state => state.app.datadisplayselector.showSelector,
    }),
  },
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit(),
      document.getElementById('datadisplaypicture').setAttribute('_echarts_instance_', '');
  },
  methods: {
    ...mapMutations([
      'OPEN_DATADISPLAYSELECTOR',
      'CLOSE_DATADISPLAYSELECTOR'
    ]),
    //初始化echarts
    echartsInit() {
      let myChart = echarts.init(document.getElementById('datadisplaypicture'));
      // 自适应
      var listener = function () {
        myChart.resize()
      }
      EleResize.on(this.$refs.bar, listener)
      myChart.setOption({
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


      },


      );

    },

  }
}





</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';


.leftboardWithselector {
  float: left;
  width: 80%;
  height: 75vh;
  position: relative;
}

.leftboardWithoutselector {
  float: left;
  width: 100%;
  height: 75vh;
  position: relative;
}

.title {
  height: .25rem;
  border-bottom-color: gray;
  border-bottom-width: .025rem;
  border-bottom-style: solid;
  font-size: .25rem;
  color: #000;
  line-height: .0625rem;
}

.selector-open {
  float: right;
  width: 20%;
  position: relative;
  height: 7.5rem;
  border-left-color: aqua;
  border-left-width: .025rem;
  border-left-style: solid;
}

.selector-close {
  position: relative;
  float: right;
  width: 0rem;
  height: 7.5rem;
  border-left-color: aqua;
  border-left-width: .025rem;
  border-left-style: solid;
  opacity: 0;
}

.selector .functionicon {
  margin-left: calc($datadispalyslectorWith - 2rem);
  margin-top: .125rem;
}

img {
  width: .375rem;
  height: .3125rem;
}

.foldicon {
  margin-left: 95%;
  margin-top: .125rem;
  z-index: 1.25rem;

  .left {
    display: inline-block;

    cursor: pointer;

    &:hover {
      background-color: $iconSelected;
      border-radius: .0375rem;

    }

    .right {
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-color: $iconSelected;
        border-radius: .0375rem;

      }
    }
  }
}
.tips{
  font-size: .25rem;
}
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: .2rem;
}

.selectboard {
  margin-top: .25rem;
}

.selectboard .selectedlist {
  margin-top: .125rem;
}

.selectboard .selectedlist div {
  display: inline-block;
  vertical-align: top;
  margin-left: .05rem;
}
</style>
