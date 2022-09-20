<template>
  <div>
    <!-- 收缩栏 -->
    <div class="list-control">
      <MyButton class="control-btn"
        @click="showSelector==true ? CLOSE_DATADISPLAYSELECTOR() : OPEN_DATADISPLAYSELECTOR() ">
        <Operation width='15' />
      </MyButton>
    </div>

    <div class="data-area">
      <!-- 左边折线图 -->
      <div :class="{ 'leftboardWithselector': showSelector, 'leftboardWithoutselector': !showSelector }">
        <div ref="chartDom" :style="{ width: '100%', height: '100%' }">
        </div>
      </div>

      <!-- 右边选择框 -->
      <div class="select-container" :class="{'selector-close': !showSelector }">
        <div class="function-icon">
          <!-- 曲线数据展示范围选择 -->
          <Form ref="formRef" :model="selectdatadisplay" inline>
            <FormItem>
              <MyButton style="position:relative;top: 4px">
                <img src="../assets/撤销.svg" alt="#" @click="reSetDataRegion()" width="15">
              </MyButton>
            </FormItem>
            <FormItem prop="start">
              <Input v-model="selectdatadisplay.start" placeholder="起始点" @on-change='reSetDataRegiondisplay()' />
            </FormItem>

            <FormItem prop="end">
              <Input v-model="selectdatadisplay.end" placeholder="结束点" @on-change='reSetDataRegiondisplay()' />
            </FormItem>
          </Form>
          <MyButton style="position:relative;top: 4px">
            <img src="../assets/删除.svg" alt="#" @click="clearChart" width="15">
          </MyButton>
        </div>

        <div class="list-container">
          <div v-if=" dataSource.length==0" class="empty-message">未选择飞参数据</div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(data, pos) in dataSource" :name="data.id" class="data-item">
              <!-- 标题内容 -->
              <template #title>
                <h2 :style="{color: getColor(data.label)}" class="tab-title">
                  {{data.label}}
                </h2>
                <div class="tab-subtitle" :title="data.id">{{ `id: ${data.id.slice(0,5)}${data.id.length>5 ? '...' :
                ''}` }}</div>
              </template>
              <!-- 框内内容 -->
              <div class="panel-select">
                <el-cascader v-model="data.select" :options="paramSource[data.id]" @change="" class="list-tab"
                  :no-data-text=" '无匹配数据'" placeholder="参数选择" />
                <MyButton @click="addParam(data.id, pos)">+</MyButton>
              </div>
              <div style="display:flex; justify-content: space-around;">
                <div class="left-panel">
                  <div class="panel-title">模拟量</div>
                  <div class="panel-item" v-for="(param, posParam) in data.selectList['模拟量']">
                    {{param}}
                    <MyButton class="remove-btn" @click="removeParam('模拟量', data.id, pos, posParam)">
                      <CloseBold width="10" />
                    </MyButton>
                  </div>
                </div>
                <div class="right-panel">
                  <div class="panel-title">开关量</div>
                  <div class="panel-item" v-for="(param, posParam) in data.selectList['开关量']">
                    {{param}}
                    <MyButton class="remove-btn" @click="removeParam('开关量', data.id, pos, posParam)">
                      <CloseBold width="10" />
                    </MyButton>
                  </div>
                </div>
              </div>
              <div class="empty-message" v-if="data.selectList['开关量'].length==0 && data.selectList['模拟量'].length==0">
                未选择参数
              </div>

            </el-collapse-item>
          </el-collapse>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted, inject, watch, unref, nextTick, reactive } from "vue"
import { useStore } from 'vuex'
import { EleResize } from '@/utils/esresize'// 图表自适应
import paramApi from "@/api/param"
import MyButton from '@/components/MyButton.vue'
import { p } from "@antfu/utils"

// { label, value, id, select:"", selectList:[]}[]


let activeNames = ref([])

function addParam(id, pos) {
  let param = dataSource.value[pos].select
  let [type, key] = param

  if (dataSource.value[pos].selectList[type].includes(key)) return;

  dataSource.value[pos].selectList[type].push(key)
  addLine({ type, key, id })
}

function removeParam(type, id, pos, posParam) {
  // 注意获取key数值的位置
  let key = dataSource.value[pos].selectList[type][posParam]
  dataSource.value[pos].selectList[type].splice(posParam, 1)
  removeLine({ type, key, id })
}

function clearChart() {
  dataSource.value.splice(0)
  myChart.clear();
  echartsInit()
}

function getLineName({ type, key, id }) {
  return '' + id + '-' + type + '-' + key
}

// 根据曲线name获取图例配置项
function getLegendOption(name) {
  let [id, type, key] = name.split('-')
  let option = {
    name: name,
    icon: type === '模拟量' ? '' : 'circle',
    tooltip: {
      show: true,
      formatter: _ => {
        return name
      }
    }
  }
  return option
}

// 对图例数据项进行排序处理 
function sortLegendOption(option) {
  // return option
  option = option.filter(item => item != '')

  option.sort((a, b) => {
    let [aid, atype, akey] = a.name.split('-')
    let [bid, btype, bkey] = b.name.split('-')
    if (aid > bid) { return 1 }
    else if (atype < btype) { return 1 }
    else if (akey > bkey) { return 1 }
    else { return -1 }
  })

  let obj = option.reduce((obj, item) => {
    let [id, type, key] = item.name.split("-");
    if (!obj[id]) obj[id] = [];
    obj[id].push(item);
    return obj;
  }, {});

  return Object.values(obj).reduce((arr, item) => {
    item.reduce((p, c) => { p.push(c); return p }, arr)
    arr.push('')
    return arr;
  }, []);
}

// echarts操作函数
function addLine({ type, key, id }) {
  paramApi.getParamDataSingle({ id, key }).then(({ data }) => {
    let series = null
    let name = getLineName({ type, key, id })
    console.log(name)
    if (type === '模拟量') {
      series = {
        type: 'line', data, name,
        xAxisIndex: 0, yAxisIndex: 0,
        large: true,
        largeThreshold: 3000
      }
    } else {
      series = {
        type: 'line', data: data.map(i => i + offset), name, //step:'middle'
        xAxisIndex: 1, yAxisIndex: 1,
        large: true,
        largeThreshold: 3000,
      }
      offset += 2
    }

    initOption.series.push(series)
    initOption.legend.data.push(getLegendOption(name))
    initOption.legend.data = sortLegendOption(initOption.legend.data)
    myChart.setOption(initOption)
  })
}

function getColor(str) {
  return ''
  let finger = Array.from(str.slice(11))
  let num = finger.reduce((p, c) => { p += c.charCodeAt(); return p }, 0)
  // return finger.charCodeAt()
  // let num = arr.reduce((p, c) => { p += c.codePointAt(); return p }, 0)
  console.log(num)
  return `hsl(${num % 360},50%,80%)`
  // return 'red'
}

function removeLine({ type, key, id }) {
  let name = getLineName({ type, key, id })

  initOption.series = initOption.series.filter(i => i.name != name)
  initOption.legend.data.filter(i => i.name != name)

  myChart.setOption(initOption, {
    notMerge: true,
  })

  dispatchZoom()
}

// vuex全局对象P
const store = useStore();
let showSelector = computed(() => store.state.app.datadisplayselector.showSelector,)
const OPEN_DATADISPLAYSELECTOR = () => store.commit("OPEN_DATADISPLAYSELECTOR")
const CLOSE_DATADISPLAYSELECTOR = () => store.commit("CLOSE_DATADISPLAYSELECTOR")


// 事件总线
const emitter = inject("$emitter")

/**
 * 侧边栏
 */
const selectList = ref([{ data: null, param: [] }]) // 侧边栏 数据信息 data为数据唯一指定id
let dataSource = ref([]) // 选择所有数据信息
let paramSource = ref({}) // 数据信息对应的参数信息

// 侧边栏操作方法
function addSelectList() {
  selectList.value.push({ data: null, param: [] })
}

/**
 * echarts
 */
const echarts = inject('$echarts')
const chartDom = ref(null) //dom对象
let myChart = null  //echats挂载对象
let offset = 0; //开关量曲线offset
let initOption = {  //echarts初始化配置
  legend: {
    top: 0,
    itemGap: 40,
    orient: 'horizontal',
    data: [],
    formatter: function (name) {
      let sep = name.split('-')
      return sep[2]
    }
  },
  series: [
  ],
  animation: true,  // 关闭动画
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
      } else { return val.toFixed(2) }
    }
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

  // 图表整体位置
  grid: [
    {
      top: '13%',
      left: '5%',
      right: '5%',
      height: '50%',
    },
    {
      left: '5%',
      right: '5%',
      bottom: '5%',
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
      realtime: true,
    },
  ],

  xAxis: [{
    name: "时间/s",
    type: "category",
    axisTick: {
      alignWithLabel: true,
    },
    axisLabel: {
      formatter: (value) => {
        return value;
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
        return value;
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

// 记录缩放信息
let zoomStack = []
let dataZoomEvent = false
let mouseX = 0;

function dispatchZoom() {
  myChart.dispatchAction({
    type: 'takeGlobalCursor',
    key: 'dataZoomSelect',
    dataZoomSelectActive: true
  })
}

// 图表初始化
function echartsInit() {
  {
    // 获取图表对象
    myChart = echarts.init(chartDom.value);

    // 图表自适应
    var listener = function () {
      myChart.resize()
    }
    EleResize.on(chartDom.value, listener)

    // 设置图表数据
    initOption && myChart.setOption(initOption);

    myChart.dispatchAction({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true
    })

    // 为图表添加鼠标监听事件 鼠标左移动时恢复图像范围
    chartDom.value.addEventListener("mousedown", function (val) {
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

    chartDom.value.addEventListener("mouseup", function (val) {
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


/**
 * 初始化
 */
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
  // 飞参数测试时间
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
    let json = { label, value, id, select: "", selectList: { '模拟量': [], '开关量': [] } }

    // 更新获取dataSource
    dataSource.value.push(json)
    activeNames.value.push(id)

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

.empty-message {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 0px;
  // padding-bottom: 15px;
  font-weight: bold;
  color: #bbb;
}

.function-icon {
  display: flex;
}

.data-area {
  padding-top: 40px;
  display: flex;
  border-radius: 10px;
  // background: #fff;
  // box-shadow: 12px 12px 24px #cccccc,
  //   -12px -12px 24px #ffffff;
}

.leftboardWithselector {
  padding: 40px;
  padding-bottom: 80px;
  padding-top: 0px;
  height: $dataDisplayHeight;

  width: calc(100% - $selectboardWitdh);

}

.leftboardWithoutselector {
  padding: 40px;
  padding-bottom: 80px;
  padding-top: 0px;
  height: $dataDisplayHeight;

  width: 100%;

  // flex: 1;
}

.select-container {
  width: $selectboardWitdh;

  padding: 10px;
  padding-right: 5px;

  border-radius: 0px;
  background: #ffffff;
  box-shadow: 12px 12px 24px #cccccc,
    -12px -12px 24px #ffffff;
}

.selector-close {
  width: 0px;
  transform: translate($selectboardWitdh);
}

.list-container {
  user-select: none;
  font-size: large;
  overflow: scroll !important;
  height: 90%;
  // padding-left: 10px;
  // padding-right: 10px;

  .tab-title {}

  .tab-subtitle {
    margin-left: 10px;
    position: relative;
    top: 2px;
  }

  .data-item {
    border: 1px solid #eee;
    padding: 0px 10px;
    border-bottom: none;
  }

  .data-item:last-child {
    border-bottom: 2px solid #eee;
  }

  .panel-select {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;

    button {
      font-weight: bold;
      margin-left: 20px;
    }
  }

  .left-panel,
  .right-panel {
    flex: 1;

    // background-color: red;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 5px;

    // flex-wrap: column ;
    .panel-title {
      display: flex;
      justify-content: center;
      font-weight: bold;
      font-size: medium;
      margin-top: 5px;
      width: 80%;
      // background-color: red;
      border-bottom: 1px solid #ddd;
    }

    .panel-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      padding: 2px;
      background-color: #eee;

      .remove-btn {
        width: 15px;
        height: 15px;
      }
    }
  }
}



.function-icon {
  display: flex;
  justify-content: end;
  height: 30px;
  margin-bottom: 20px;
  margin-right: 5px;
  gap: 5px;
}



.list-control {
  margin: 10px;
  display: flex;
  justify-content: end;
  gap: 5px;
  position: absolute;
  right: 0px;
  top: 80px;
}

.list-control .control-btn {
  opacity: 0.8;
  transition: 0.2s;
}

.list-control:hover .control-btn {
  opacity: 1;
  transition: 0.2s;
}

:deep(.ivu-form-inline) {
  display: flex;
}

:deep(.ivu-form-inline .ivu-form-item) {
  display: inline-flex;
}

:deep(.ivu-select-dropdown span) {
  float: none;
}
</style >
<style>
.el-cascader {}

.el-cascader-menu {
  /* min-width: 120px; */
  max-width: 120px;
}
</style>
