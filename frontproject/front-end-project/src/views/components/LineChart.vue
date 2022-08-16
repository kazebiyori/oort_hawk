<template>
  <div ref="chart" id="chart"></div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';

// 图表默认字体
const defaultFont = "'Open Sans Condensed', sans-serif";

// 从根组件获取组件
const echarts = inject('$echarts')
// 获取图表dom组件
const chart = ref(null)
// 待初始化的日历对象
let myChart = null

// 图表配置信息-初始化
const chartConfigInit = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '20%'];
    }
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    name: '统计量'
  },
  series: [
    {
      data: [['2020-10-1', 450],
      ['2020-10-2', 350],
      ['2020-10-3', 290],
      ['2020-10-4', 380],
      ['2020-10-5', 540],
      ['2020-10-6', null],
      ['2020-10-7', null],
      ['2020-10-8', 430],
      ['2020-10-9', 330],
      ['2020-10-10', 280],
      ['2020-10-11', 340],
      ['2020-10-12', 455],
      ['2020-10-13', 330],],
      type: 'line',
      smooth: true
    }
  ],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10
    },
    {
      start: 0,
      end: 100
    }
  ],
}

// 初始化操作
onMounted(() => {
  chart.value.focus()
  myChart = echarts.init(chart.value)
  myChart.setOption(
    chartConfigInit
  )
})

</script>

<style scoped>
#chart {
  width: 900px;
  height: 400px;
  margin: 5px auto;
}
</style>