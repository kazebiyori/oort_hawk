<template>
  <div ref="chart" id="chart"></div>
  <div class="date-picker">
    <el-button style="float:left" @click="currentYear = parseInt(currentYear) - 1 + ''">上年</el-button>
    <label>日期选择：</label>
    <DatePicker v-model="startDate" format="yyyy-MM-dd" type="date" placeholder="选择起始日期" style="width: 150px" />
    ~
    <DatePicker v-model="endDate" format="yyyy-MM-dd" type="date" placeholder="选择终止日期" style="width: 150px" />
    <el-button style="float:right" @click="currentYear = parseInt(currentYear) + 1 + ''">下年</el-button>
  </div>

</template>

<script setup>
import moment from "moment";
import { getDaysBetween } from '@/utils/date'
import { ref, onMounted, inject, watch } from 'vue';

// 图表默认字体
const defaultFont = "'Open Sans Condensed', sans-serif";

// 从根组件获取组件
const echarts = inject('$echarts')
// 获取图表dom组件
const chart = ref(null)
// 待初始化的日历对象
let myChart = null

// 存储年份信息
let startYear = moment().format('YYYY')
let endYear = moment().format('YYYY')
let currentYear = ref(moment().format('YYYY'))

// 存储选择起止日期，并存储日期间天数
let startDate = ref('')
let endDate = ref('')
let selectDays = []

// 动态设置各年份背景日期
let bgDays = getDaysBetween(startYear + '-01-01', endYear + '-12-31', 0)

// 监听当前年份
watch(currentYear, (newYear) => {
  if (parseInt(newYear) > parseInt(endYear)) {
    endYear = newYear
    bgDays = getDaysBetween(startYear + '-01-01', endYear + '-12-31', 0)
    chartConfigInit.series.data = bgDays
  } else if (parseInt(newYear) < parseInt(startYear)) {
    startYear = newYear
    bgDays = getDaysBetween(startYear + '-01-01', endYear + '-12-31', 0)
    chartConfigInit.series.data = bgDays
  }
  chartConfigInit.calendar.range = newYear
  myChart.setOption(chartConfigInit)
})

// 监听起止日期
watch([startDate, endDate], ([newStartDate, newEndDate]) => {
  selectDays = getDaysBetween(newStartDate, newEndDate, 50)
  chartConfigSelected.series[1].data = selectDays
  myChart.setOption(chartConfigSelected)
})

// 图表配置信息-初始化
const chartConfigInit = {
  textStyle: {
    fontFamily: defaultFont,
  },
  visualMap: {
    show: false,
    min: 0,
    max: 3,
    inRange: {

    },
    outOfRange: {
    },
  },
  calendar: {
    splitLine: {
      show: false,
    },

    range: currentYear.value,
    top: 'center',
    right: 10,
    left: 60,
    yearLabel: {
      fontFamily: defaultFont,
    },
    monthLabel: {
      nameMap: 'ZH',
      color: '#000',
    },
    dayLabel: {
      nameMap: 'ZH',
      color: '#000',
    },
    itemStyle: {
      // color: '#f3f3f3',
      // borderColor: '#ccc',
      borderColor: '#ccc',
    },
  },
  series: {
    type: 'scatter',
    coordinateSystem: 'calendar',
    symbol: 'roundRect',
    // symbolSize: Math.min((chart.getWidth() - 70) / 80, 16),
    // symbolSize: 15,
    data: bgDays,
    itemStyle: {},
    universalTransition: {
      enabled: true,
      seriesKey: 'calendar',
    },
  },
}

// 图表配置信息-高亮变化
let chartConfigSelected = {
  // title: {
  //   text: 'Highlight Data with Special Effect',
  //   left: 'left',
  //   top: 20,
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 30,
  //     fontFamily: defaultFont,
  //   },
  // },
  // animationEasingUpdate: 'linear',
  // animationDurationUpdate: 1000,
  animation: false,
  series: [
    {
      type: 'scatter',
      itemStyle: {
        opacity: 0.1,
      },
    },
    {
      type: 'effectScatter',
      coordinateSystem: 'calendar',
      // symbolSize: Math.min((chart.getWidth() - 70) / 80, 16),
      rippleEffect: {
        // brushType: 'stroke',
        scale: 0,
      },
      symbol: 'roundRect',
      // color: 'red',

      data: [],
    },
  ],
}

// 初始化操作
onMounted(() => {
  chart.value.focus()
  myChart = echarts.init(chart.value)
  myChart.setOption(
    chartConfigInit
  )
  myChart.setOption(
    chartConfigSelected
  )

  // 为图表添加点击事件
  myChart.on('click', ({ value }) => {
    const selectDate = value[0]

    // 第一次点击图表，初始化起止日期
    let quit = false
    if (startDate.value == '' && endDate.value == '') {
      startDate.value = selectDate
      endDate.value = selectDate
      quit = true
    } else if (startDate.value == '') {
      startDate.value = selectDate
      quit = true
    } else if (endDate.value == '') {
      endDate.value = selectDate
      quit = true
    }
    if (quit) {
      const endMoment = moment(endDate.value)
      const startMoment = moment(startDate.value)
      if (startMoment > endMoment) {
        [startDate.value, endDate.value] = [endDate.value, startDate.value]
      }
      return
    }

    // 修改图表起止日期
    const selectMoment = moment(selectDate)
    const endMoment = moment(endDate.value)
    const startMoment = moment(startDate.value)
    if (selectMoment > endMoment) {
      endDate.value = selectDate
    } else if (selectMoment < startMoment) {
      startDate.value = selectDate
    }
    else {
    }
  })
})



</script>

<style>
.date-picker {
  width: 1000px;
  margin: 12px auto;

  text-align: center;
}

#chart {
  width: 900px;
  height: 210px;
  margin: 5px auto;
}
</style>