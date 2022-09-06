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
              <Cascader :data="data" v-model="value" placeholder="参数A" v-width="80"/>
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
            }
          ]
        }],
        cityList: [
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
        var axisData= ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

var seriesData = [{ name: '直接访问', data: [320, 302, 301, 334, 390, 330, 320] },
{name: '邮件营销', data: [120, 132, 101, 134, 120, 230, 210]}];
        var newData = [];
        var serLineItem = function () {
    return {
        name: '',
        type: 'line',
        data: []
    }
}
    var legendData = [];
    for (var i = 0; i < seriesData.length; i++) {
        var lineItem = new serLineItem();
        lineItem.name = seriesData[i].name;
        legendData.push(seriesData[i].name);
        lineItem.data = seriesData[i].data;
        newData.push(lineItem);
    }
        option = {
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

  
        option && myChart.setOption(option);
  
      },
  
    }
  }
  
  
  
  
  
  </script>
  
  <style lang="scss" scoped>
  @import '@/styles/variables.scss';
  :deep(.ivu-cascader-menu){
    min-width: 40px;
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
  height: 20px;
  border-bottom-color: gray;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  font-size: 20px;
  color: #000;
  line-height: 5px;
}

.selector-open {
  float: right;
  width: 20%;
  position: relative;
  height: 600px;
  border-left-color: aqua;
  border-left-width: 2px;
  border-left-style: solid;
}

.selector-close {
  position: relative;
  float: right;
  width: 0px;
  height: 600px;
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

.foldicon {
  margin-left: 95%;
  margin-top: 10px;
  z-index: 100px;

  .left {
    display: inline-block;

    cursor: pointer;

    &:hover {
      background-color: $iconSelected;
      border-radius: 3px;

    }

    .right {
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-color: $iconSelected;
        border-radius: 3px;

      }
    }
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
  