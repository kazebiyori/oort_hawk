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

    <div class="data-area">
      <!-- 左边折线图 -->
      <div :class="{ 'leftboardWithselector': showSelector, 'leftboardWithoutselector': !showSelector }">
        <div id="chart" ref="chart" :style="{ width: '100%', height: '100%' }">
        </div>
      </div>

      <!-- 右边选择框 -->
      <div class="selector" :class="{'selector-close': !showSelector }">
        <!-- <span class="tips">
          已选择7项，展示3项
        </span> -->

        <div class="function-icon">
          <!-- 曲线数据展示范围选择 -->

          <Form ref="formRef" :model="selectdatadisplay" inline>
            <FormItem>
              <img src="../assets/撤销.svg" alt="#" @click="reSetDataRegion()">
            </FormItem>
            <FormItem prop="start">
              <Input v-model="selectdatadisplay.start" placeholder="起始点" @on-change='reSetDataRegiondisplay()' />
            </FormItem>

            <FormItem prop="end">
              <Input v-model="selectdatadisplay.end" placeholder="结束点" @on-change='reSetDataRegiondisplay()' />
            </FormItem>
          </Form>
          <!-- <img src="../assets/看.svg" alt="#"> -->
          <img src="../assets/加.svg" alt="#" @click="addSelectList">
          <img src="../assets/删除.svg" alt="#" @click="clearSelectList">
        </div>

        <div class="select-list" v-for="(select,index) in selectList" :key="index">

          <!-- <el-color-picker v-model="select.color" /> -->
          <Select v-model="select.data" placeholder="数据选择" class="data" transfer
            @on-change="val => { handleDataChange(val,index) }">
            <Option v-for="item in dataSource" :value="item.id" :key="item.id">{{
            item.label
            }}
            </Option>
          </Select>
          <el-cascader v-model="select.param" :options="paramSource[select.data]" :no-data-text=" '无匹配数据' "
            @change="val => { handleParamChange(val,index) }" class="param" placeholder="参数选择"
            popper-class='mycascaderstyle' />

          <!-- <el-select v-model="select.data" class="data" placeholder="数据选择" size="large">
            <el-option v-for="item in dataSource" :key="item.id" :label="item.label" :value="item.id" />
          </el-select> -->

          <!-- <Cascader :data="param" v-model="value" v-width="200" class="param" transfer /> -->
          <img src="../assets/删除.svg" alt="#" @click="deleteItemFromList(index)">
          <!-- <img src="../assets/看.svg" alt="#"> -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<script ts setup>
import { ref, computed, onMounted, inject, watch, unref, nextTick, reactive } from "vue"
import { useStore } from 'vuex'
import { EleResize } from '@/utils/esresize'// 图表自适应
import paramApi from "@/api/param"

import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  setFetchMethod
} from 'darkreader';
import { set } from "lodash";
import { ensureScaleRawExtentInfo } from "echarts/lib/coord/scaleRawExtentInfo";

// vuex全局对象
const store = useStore();
let showSelector = computed(() => store.state.app.datadisplayselector.showSelector,)
const OPEN_DATADISPLAYSELECTOR = () => store.commit("OPEN_DATADISPLAYSELECTOR")
const CLOSE_DATADISPLAYSELECTOR = () => store.commit("CLOSE_DATADISPLAYSELECTOR")

// 获取图表
const echarts = inject('$echarts')
const chart = ref(null) //dom对象
let myChart = null  //操作对象
// 已绘制的参数列表
let paramdrawedarray = []
// 获取事件总线
const emitter = inject("$emitter")

// 侧边栏 数据信息 data为数据唯一指定id
const selectList = ref([{ color: "#123456", data: 0, param: "" }])
// 侧边栏操作方法
function addSelectList() {
  selectList.value.push({ color: "#123456", data: "", param: "" })
}
function clearSelectList() {
  // 重新初始化myChart组件
  myChart.clear()
  myChart.setOption(initOption)
  selectList.value = []
  paramdrawedarray = []
  chartOption.series = []
}
function deleteItemFromList(index) {
  // let type = val[0]
  // let key = val[1]

  // let name = selectList.value[index];

  offset = 0;
  let pre = selectList.value[index].param
  let type = pre[0]
  let key = pre[1]
  let name = "" + type + key + ':' + selectList.value[index].data; ""
  chartOption.series = arrRemoveIndex(index, chartOption.series)
  paramdrawedarray = arrRemoveIndex(index, paramdrawedarray)

  // echarts 通过dispatch控制图例点击事件
  myChart.dispatchAction({
    type: 'legendUnSelect',
    name
  })

  legendData.data = legendData.data.filter(item => item != name)
  myChart.setOption({ legend: legendData })


  selectList.value = selectList.value.filter((item, i) => i != index)
}

// 选择所有数据信息
let dataSource = ref([
])

// 数据信息对应的参数信息
let paramSource = ref({})

// 参数信息缓存
let paramDataSource = ref({})

watch(selectList, () => {
  // console.log("list change");
},
  {
    deep: true,
  })

// 选项修改
function handleDataChange(val, index) {
  selectList.value[index].param = ""
}

let legendData = {
  top: 0,
  orient: 'horizontal',
  data: [],
  // 使用回调函数
  formatter: function (name) {
    return name.match(/(\S*):/)[1];
  }
}

let offset = 0;

// //根据数组的下标，删除该下标的元素
var arrRemoveJson = function (arr, attr, value) {
  if (!arr || arr.length == 0) {
    return ""
  }
  let newArr = arr.filter(function (item, index) {
    return item[attr] != value
  })
  return newArr
}

//index为删除项的下标值  arr为源数组
var arrRemoveIndex = function (index, arr) {
  if (!arr || arr.length == 0) {
    return ""
  }
  arr.splice(index, 1)
  return arr
}


// 参数修改
function handleParamChange(val, index) {
  let id = selectList.value[index].data
  let type = val[0]
  let key = val[1]

  // let name = selectList.value[index];
  let name = "" + type + key + ":" + id;

  // 新选择器选择的数据标志
  let indexdrawedflag = paramdrawedarray[index] == null

  // 选择器重新选择了新数据则删除原来的曲线，再绘制新曲线
  if (!indexdrawedflag) {
    let paramdrawedname = paramdrawedarray[index]
    chartOption.series = arrRemoveJson(chartOption.series, 'name', paramdrawedname)
  }
  // 是新增的选择器选择的数据则直接新增绘制曲线
  paramdrawedarray[index] = name
  legendData.data = legendData.data.filter(item => item != "")
  legendData.data.push(name)
  legendData.data.sort()
  let pos = legendData.data.findIndex(item => { if (item.match("模拟量")) return true })
  if (pos != -1) {
    legendData.data.splice(pos, 0, '\n')

    console.log(pos)
  }
  console.log(legendData.data)
  myChart.setOption({ legend: legendData })
  if (pos != -1) {
    legendData.data.splice(pos, 1)
  }
  console.log(legendData.data)
  console.log(type)
  if (type == "模拟量") {
    // let { data } = await paramApi.getParamDataSingle({ id, key })
    paramApi.getParamDataSingle({ id, key }).then(({ data }) => {
      chartOption.series.push({
        type: 'line', data, name,
        xAxisIndex: 0, yAxisIndex: 0,
        // symbol: "none",
        // symbolSize: 0,
        // smooth: true,
        // sampling: 'average',
        large: true,
        largeThreshold: 3000,
      })
      myChart.setOption(chartOption)
      // myChart.setOption({ series: { type: 'line', data, smooth: true } }, true)
    })
  } else if (type == "开关量") {
    paramApi.getParamDataSingle({ id, key }).then(({ data }) => {
      chartOption.series.push({
        type: 'line', data: data.map(i => i + offset), name, //step:'middle'
        xAxisIndex: 1, yAxisIndex: 1,


        // symbol: "none",
        // symbolSize: 0,
        // smooth: true,
        // sampling: 'average',
        large: true,
        largeThreshold: 3000,
      })
      offset += 2
      myChart.setOption(chartOption)
      // myChart.setOption({ series: { type: 'bar', data, smooth: true } }, true)
    })
  }
  // }
}

// 数据图配置信息 -------------------------------------------------------------------------------------

let initOption = {
  // 关闭动画
  animation: false,

  // 图例配置
  // legend: {
  //   orient: 'horizontal',
  //   // top: 10,

  //   data: ["a", "b"]
  // },

  // 鼠标悬停提示
  tooltip: {

    show: true,
    trigger: 'axis',
    transitionDuration: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    order: 'valueDesc',

    // 通过格式化，将开关量转换为0-1数值
    valueFormatter: (val) => {
      if (Number.isInteger(val)) {
        return val % 2
      } else { return val }
    }

    // showContent: true,

    // // triggerOn: 'click',    
    // // enterable: true,

    // // formatter: '{b0}: {c0}<br />{b1}: {c1}',

    // extraCssText: 'width: 170px',

    // axisPointer: {
    //   animation: false,
    //   type: 'cross'
    // }
  },

  // 鼠标悬停与坐标轴提示
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {
      backgroundColor: '#777'
    },
    type: "cross"
  },

  // 工具栏
  toolbox: {
    show: true,
    showTitle: false,
    itemSize: 0,
    feature: {
      dataView: { show: true, readOnly: true },
      dataZoom: {
        yAxisIndex: false,
      },
      restore: {},
      saveAsImage: {},
    }
  },

  // 未知配置项
  // brush: {
  //   xAxisIndex: 'all',
  //   brushLink: 'all',
  //   outOfBrush: {
  //     colorAlpha: 0.1
  //   }
  // },

  // 图表整体位置
  grid: [
    {
      left: '5%',
      right: '5%',
      height: '50%',
    },
    {
      left: '5%',
      right: '5%',
      bottom: '10%',
      height: '25%',
    }
  ],

  // 未知配置
  dataZoom: [
    {
      show: true,
      type: 'slider',
      xAxisIndex: [0, 1],
      start: 0,
      end: 100,
      // 数据量大后，realtime出现卡顿
      realtime: false,
    },
    // {
    //   show: true,
    //   xAxisIndex: [0, 1],
    //   type: 'slider',
    //   top: '85%',
    //   start: 0,
    //   end: 100,
    //   // realtime: true,
    // },
  ],

  // 横坐标配置 可以配置多条横坐标
  // xAxis: [{
  //   type: 'category',
  //   boundaryGap: false,
  //   // scale: true,
  //   boundaryGap: false,
  //   axisLine: { onZero: false },
  //   splitLine: { show: false },
  //   splitNumber: 20,
  //   min: 'dataMin',
  //   max: 'dataMax',
  //   axisPointer: {
  //     z: 100
  //   },
  // },
  // // 未知配置
  // {
  //   type: 'category',
  //   gridIndex: 1,
  //   // data: data.categoryData,
  //   // scale: true,
  //   boundaryGap: false,
  //   axisLine: { onZero: false },
  //   axisTick: { show: false },
  //   splitLine: { show: false },
  //   axisLabel: { show: false },
  //   splitNumber: 20,
  //   min: 'dataMin',
  //   max: 'dataMax',
  //   axisPointer: {
  //     label: {
  //       formatter: function (params) {
  //         var seriesValue = (params.seriesData[0] || {}).value;
  //         return (
  //           params.value +
  //           (seriesValue != null
  //             ? '\n' + echarts.format.addCommas(seriesValue)
  //             : '')
  //         );
  //       }
  //     }
  //   }
  // }],


  // xAxis: [{
  //   name: "横坐标",
  //   type: "category"
  // }, {
  //   name: "横坐标",
  //   gridIndex: 1,
  //   type: "category"
  // },
  // ],

  xAxis: [{
    name: "时间/s",
    type: "category",
    axisTick: {
      alignWithLabel: true,
    },
    axisLabel: {
      formatter: (value) => {
        return value / 5;
      }
    }
  },
  {
    gridIndex: 1,
    name: "时间/s",
    type: "category",
    axisTick: {
      alignWithLabel: true,
    },
    axisLabel: {
      formatter: (value) => {
        return value / 5;
      }
    }
  },
  ],
  // 纵坐标配置
  yAxis: [{
    name: "数值",
    type: "value",
  }, {
    name: "开关",
    type: "value",
    gridIndex: 1,
    splitNumber: 2,
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  }],
}


let chartOption = {
  series: [
  ]
}



// function helpFunc() {
//   // 根据序列数据获取图例等信息
//   for (let i = 0; i < seriesData.length; i++) {
//     var lineItem = new serLineItem();
//     lineItem.name = seriesData[i].name;
//     legendData.push(seriesData[i].name);
//     lineItem.data = seriesData[i].data;
//     newData.push(lineItem);
//   }
// }

// 记录缩放信息
let zoomStack = []
let dataZoomEvent = false
let mouseX = 0;
// 图表初始化
function echartsInit() {
  {
    // 获取图表对象
    chart.value.focus()
    // myChart = echarts.init(chart.value, 'dark');
    myChart = echarts.init(chart.value);

    // 图表自适应
    var listener = function () {
      myChart.resize()
    }
    EleResize.on(chart.value, listener)

    // 设置图表数据
    initOption && myChart.setOption(initOption);

    myChart.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true
    })

    // 为图表添加鼠标监听事件 鼠标左移动时恢复图像范围
    chart.value.addEventListener("mousedown", function (val) {
      // 判断鼠标在canvas中垂直方向位置
      let targetHeight = this.clientHeight
      let height = val.zrY
      let threshold = height / targetHeight
      if (threshold > 0.9) { mouseX = 0 }
      else {
        mouseX = val.zrX
      }
    })

    // 监听数据缩放事件
    myChart.on('datazoom', (val) => {
      if (!val.batch) {
        zoomStack = []
        return
      } else {
        dataZoomEvent = true;
        let tmp = [val.batch[0].startValue, val.batch[0].endValue]
        // 若缩放区域与上次不等，则push进stack
        if (zoomStack.length == 0 || tmp.toString() != zoomStack[zoomStack.length - 1].toString()) {
          zoomStack.push(tmp)
        }
      }
    })

    chart.value.addEventListener("mouseup", function (val) {
      if (dataZoomEvent == false) return;

      if (val.zrX < mouseX) {
        let show1 = [...zoomStack]
        console.log("show1", show1);
        zoomStack.pop();
        zoomStack.pop();
        let show2 = [...zoomStack]
        console.log("show2", show2);

        let tmp = zoomStack.pop()
        console.log("tmp", tmp);
        let show3 = [...zoomStack]
        console.log("show3", show3);
        if (!tmp) {
          myChart.dispatchAction({
            type: 'dataZoom',
            start: 0,
            end: 100,
          })
        }
        else {
          let start = tmp[0]
          let end = tmp[1]
          console.log(start, end);
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: start,
            endValue: end
          })
        }
      }

      dataZoomEvent = false;
    })
  }
}

onMounted(() => {
  // setFetchMethod(window.fetch)
  // enableDarkMode({
  //   brightness: 100,
  //   contrast: 90,
  //   sepia: 10,
  // });
  echartsInit()
})

// {checked:bollean, data:{id:string, dataId:string, testTimeStart: string}}  data
// 选择新数据源事件
emitter.on("chooseNewData", async (data, check) => {
  // 如果是取消勾选 或 父组件选择 则不添加到dataSource
  if (!data.checked) return
  if (data.data.children) return
  // 飞参信息id
  let id = data.data.id
  // 飞参数据id
  let value = data.data.dataId
  // 飞惨测试时间
  let label = data.data.testTimeStart
  let inList = false

  dataSource.value.forEach(item => {
    if (item.value == value || item.id == id) {
      inList = true;
      return
    }
  })

  // 如果新数据不在列表中
  if (!inList) {
    let json = { label, value, id }

    // 更新获取dataSource
    dataSource.value.push(json)

    // 通过data id获取参数列表
    let { data: analogList } = await paramApi.getAnalogList({ id: id })
    let { data: switchList } = await paramApi.getSwitchList({ id: id })

    let analogDisplay = []
    let switchDisplay = []

    analogList.forEach(item => {
      analogDisplay.push({ label: item, value: item })
    })
    switchList.forEach(item => {
      switchDisplay.push({ label: item, value: item })
    })

    // 在参数数据源中添加对应参数列表
    paramSource.value[id] = [{ value: '模拟量', label: "模拟量" }, { value: '开关量', label: "开关量" }]
    paramSource.value[id][0]["children"] = analogDisplay
    paramSource.value[id][1]["children"] = switchDisplay
  }
})

// 图表数据显示范围选择初始化 响应式
const selectdatadisplay = reactive({
  start: '0',
  end: '100',
})
// 图表数据显示范围选择重置
let formRef = ref(null)
const reSetDataRegion = () => {
  nextTick(() => {
    // const form = unref(formRef)
    // form.resetFields()
    formRef.value.resetFields()
    // set(selectdatadisplay, 'start', 0)
    // set(selectdatadisplay, 'end', 100)
  })
  myChart.dispatchAction({
    type: 'dataZoom',
    start: 0,
    end: 100,
  })
}
// 图表数据范围选择后图标显示更新
const reSetDataRegiondisplay = () => {
  myChart.dispatchAction({
    type: 'dataZoom',
    start: selectdatadisplay.start,
    end: selectdatadisplay.end
  })
}

</script>
  
<style lang="scss" scoped>
@import '@/styles/variables.scss';

$selectboardWitdh: 400px;

:deep(.ivu-select-dropdown span) {
  float: none;
}

.data-area {
  display: flex;
}

.leftboardWithselector {
  padding: 40px;
  padding-bottom: 80px;
  padding-top: 0px;
  width: calc(100% - $selectboardWitdh);
  height: $dataDisplayHeight;
}

.leftboardWithoutselector {
  padding: 40px;
  padding-bottom: 80px;
  padding-top: 0px;
  width: 100%;
  height: $dataDisplayHeight;
}

.selector {
  position: relative;
  width: $selectboardWitdh;
  height: $dataDisplayHeight;
  border: $borderStyle;
  padding: 10px;

}

.selector-close {
  width: 0px;
  height: 0px;

  transform: translate($selectboardWitdh);
}

img {
  width: 25px;
  height: 25px;

}

img:hover {
  background-color: $iconSelected;
  border-radius: 3px;
  cursor: pointer;
}

.tips {
  float: left;
  position: relative;
  top: 4px;
  left: 3px;
}

.function-icon {
  display: flex;
  justify-content: end;
  height: 30px;
  margin-bottom: 20px;
  margin-right: 5px;
  gap: 5px;
}

:deep(.ivu-form-inline) {
  display: flex;
}

:deep(.ivu-form-inline .ivu-form-item) {
  display: inline-flex;
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

.select-list {
  margin: 1px;
  margin-top: 10px;
  display: flex;
  gap: 5px;
  user-select: none !important;

  .data {
    flex: 2 !important;
  }

  .param {
    flex: 1;
  }
}
</style >
<style>
/* 级联选择器下拉列表宽度修改 */
.el-cascader-menu {
  min-width: 120px;
  max-width: 120px;
}
</style>
