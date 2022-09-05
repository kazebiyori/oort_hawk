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
              <Select v-model="model" style="{width:1rem;height:0.5rem;font-size:0.2rem}" placeholder="数据A">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>

            </div>
            <div class="parameterselect">
              <Cascader :data="data" v-model="value" placeholder="参数A" />
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

  import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    auto as followSystemColorScheme,
    exportGeneratedCSS as collectCSS,
    setFetchMethod
} from 'darkreader';
  
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

      setFetchMethod(window.fetch);
        enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
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
  
        var option;
  
        // prettier-ignore
        let timeData1 = [];
  
        let dataP1 = [];
  
        let dataP2 =[];
        let dataP3 = [];
        let dataP4 = [];
        let dataP5 = [];
        let dataP6 = [];
        // timeData = timeData.map(function (str) {
        //   return str.replace('2009/', '');
        // });
        option = {
          title: {
            text: '数据复放',
            left: 'center'
          },
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
              data: timeData1
            }
          ],
          yAxis: [
            {
              name: 'value',
              type: 'value'
            }
          ],
          legend: {
            data: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
            top: 50,
            right: 10,
            orient: 'vertical',
            backgroundColor: 'rgba(221, 228, 242, 0.2)'
          },
          series: [
            {
              name: 'p1',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP1
            },
            {
              name: 'p2',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP2
            },
            {
              name: 'p3',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP3
            },
            {
              name: 'p4',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP4
            },
            {
              name: 'p5',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP5
            },
            {
              name: 'p6',
              type: 'line',
              showSymbol: false,
              // prettier-ignore
              data: dataP6
            }
          ]
        };
  
        option && myChart.setOption(option);
  
      },
  
    }
  }
  
  
  
  
  
  </script>
  
  <style lang="scss" scoped>
  @import '@/styles/variables.scss';
  
  :deep(.ivu-cascader-rel) {
    width: 1rem;
    height: .375rem;
    font-size: .3rem;
  }
  
  :deep(.ivu-select) {
    width: 1rem;
    height: .375rem;
    font-size: .3rem;
  }
  
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
  
  .tips {
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
  