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
        <span class="tips">
          已选择7项，展示3项
        </span>
        <div class="function-icon">
          <!-- <img src="../assets/看.svg" alt="#"> -->
          <img src="../assets/加.svg" alt="#" @click="addSelectList">
          <img src="../assets/删除.svg" alt="#" @click="clearSelectList">
        </div>

        <div class="select-list" v-for="(select,index) in selectList" :key="index">

          <el-color-picker v-model="select.color" />

          <el-cascader v-model="select.param" :options="paramSource[select.data]" @change="handleChange" class="param"
            placeholder="参数选择" />

          <Select v-model="select.data" placeholder="数据选择" class="data" transfer>
            <Option v-for="item in dataSource" :value="item.id" :key="item.id">{{ item.label }}</Option>
          </Select>

          <!-- <Cascader :data="param" v-model="value" v-width="200" class="param" transfer /> -->

          <img src="../assets/删除.svg" alt="#" @click="deleteItemFromList(index)">
          <!-- <img src="../assets/看.svg" alt="#"> -->

        </div>
      </div>
    </div>

  </div>
</template>
  
<script setup>
import { ref, computed, onMounted, inject, watch } from "vue"
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

// vuex全局对象
const store = useStore();
let showSelector = computed(() => store.state.app.datadisplayselector.showSelector,)
const OPEN_DATADISPLAYSELECTOR = () => store.commit("OPEN_DATADISPLAYSELECTOR")
const CLOSE_DATADISPLAYSELECTOR = () => store.commit("CLOSE_DATADISPLAYSELECTOR")

// 获取图表
const echarts = inject('$echarts')
const chart = ref(null) //dom对象
let myChart = null  //操作对象

// 获取事件总线
const emitter = inject("$emitter")

// 侧边栏 数据信息 data为数据唯一指定id
const selectList = ref([{ color: "#123456", data: 0, param: "" }, { color: "#123456", data: "", param: "" }])
// 侧边栏操作方法
function addSelectList() {
  selectList.value.push({ color: "#123456", data: "", param: "" })
}
function clearSelectList() {
  selectList.value = []
}
function deleteItemFromList(index) {
  selectList.value = selectList.value.filter((item, i) => i != index)
}
watch(selectList, () => {
  console.log("list change");
},
  {
    deep: true,
  })

// 选择所有数据信息
let dataSource = ref([
])

// 数据信息对应的参数信息
let paramSource = ref({})


// 数据图配置信息 -------------------------------------------------------------------------------------
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
    paramSource.value[id] = [{ value: '模拟量', label: "模拟量" }, { value: '数字量', label: "数字量" }]
    paramSource.value[id][0]["children"] = analogDisplay
    paramSource.value[id][1]["children"] = switchDisplay
  }
})

</script>
  
<style lang="scss">
@import '@/styles/variables.scss';

$selectboardWitdh: 450px;

:deep(.ivu-select-dropdown span) {
  float: none;
}

.data-area {
  display: flex;
}

.leftboardWithselector {
  padding: 40px;
  padding-top: 0px;
  width: calc(100% - $selectboardWitdh);
  height: $dataDisplayHeight;
}

.leftboardWithoutselector {
  padding: 40px;
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
  margin: 5px;
  margin-top: 10px;
  display: flex;
  gap: 5px;

  .data {
    flex: 1;
  }

  .param {
    flex: 1;
  }
}
</style>
  