<template>
  <div class="data-display-container">
    <div class="top">

      <!-- 轮播图 -->
      <div class="top-left">
        <Tabs v-model="tabSelect">
          <TabPane icon="md-jet" label="飞机" name="飞机">
            <Carousel v-model="planeTypeIDSelect" scroll>
              <CarouselItem v-for="planeType in planeTypes">
                <img :src="planeType+'.jpeg'" :alt="planeType">
              </CarouselItem>
            </Carousel>
          </TabPane>

          <TabPane icon="md-cog" label="发动机" name="发动机">
            <Carousel v-model="engineTypeIDSelect" scroll>
              <CarouselItem v-for="engineType in engineTypes">
                <img :src="engineType + '.jpeg'" :alt="engineType">
              </CarouselItem>
            </Carousel>
          </TabPane>
        </Tabs>

        <template v-if="tabSelect == '飞机'">
          <div class="select-container">
            <Poptip placement="bottom-start" width="300" trigger="hover" title="数据详情">
              <label sytle="cursor: pointer;">飞机编号：</label>
              <template #content>
                <Table border :columns="columnsInfo" :data="dataInfoPlane" width="500px"></Table>
              </template>
            </Poptip>

            <Select v-model="planeIDSelect" style="width: 150px;">
              <!-- 没有key出现选择框无法修改的问题 -->
              <Option v-for="item in planeIDsList" :value="item" :key="item">
                {{ item }}
              </Option>
            </Select>
          </div>
        </template>

        <template v-else>
          <div class="select-container">
            <Poptip placement="bottom-start" width="300" trigger="hover" title="数据详情">
              <label sytle="cursor: pointer;">发动机编号：</label>
              <template #content>
                <Table border :columns="columnsInfo" :data="dataInfoEngine" width="500px"></Table>
              </template>
            </Poptip>

            <Select v-model="engineIDSelect" style="width: 150px;">
              <Option v-for="item in engineIDsList" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </div>
        </template>

      </div>

      <!-- 日历组件 -->
      <div class="top-right">
        <Calendar @dayChange="dayChange" />
      </div>
    </div>


    <div class="bottom">

      <div class="bottom-left">
        <!-- 卡片显示 -->
        <div class="wrapper-itmes">
          <template v-for="item in card">
            <div class="card">
              <div class="left">
                <div>{{ item.name }}</div>
                <img :src="item.iconPath" alt="#" class="icon-list">
              </div>
              <div class="right">
                <div>
                  {{ item.info }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="bottom-right">
        <LineChart :startDate="startDate" :endDate="endDate" :chartData="chartData"></LineChart>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue';
import Calendar from './components/Calendar.vue';
import LineChart from './components/LineChart.vue';
import { getFormatDay } from '@/utils/date';
import apiParam from '@/api/param';
import dataInfoApi from '@/api/dataInfo';

const emitter = inject("$emitter")


// ----------------------  日历-右上角  ----------------------------
// 数据统计 起止时间
let startDate = ref('')
let endDate = ref('')
function dayChange(payload) {
  startDate.value = getFormatDay(payload[0])
  endDate.value = getFormatDay(payload[1])
}

// ----------------------  轮播图-左上角  ----------------------------
// 单一数据源， 飞参数据列表
let dataSource = ref('')
// 选中的tab名称
let tabSelect = ref('飞机')

// 根据key数值，将list[obj]数组进行分类 生成二层obj
function groupListByKey(listObj, key) {
  return listObj.reduce((obj, item) => {
    // if (item[key] == '') return obj; // 假定不存在为‘’的key
    if (!obj[item[key]]) obj[item[key]] = []
    obj[item[key]].push(item)
    return obj
  }, {})
}

// 轮播图 标签页（飞机） 相关数据

// 飞机信息结构化数据
let dataSourcePlane = computed(() => {
  if (!dataSource.value) return;
  // 生成结构化数据 存入dataSource中
  let groupByPlaneType = groupListByKey(dataSource.value, 'planeModel')
  for (let item in groupByPlaneType) {
    groupByPlaneType[item] = groupListByKey(groupByPlaneType[item], 'planeId')
  }
  return groupByPlaneType;
})

// 轮播图选中的飞机类型 下标
let planeTypeIDSelect = ref(0)
// 选择框选择的飞机编号
let planeIDSelect = ref(null)

// 轮播图正在展示的飞机类型
let planeTypeShow = computed(() => {
  return planeTypes.value[planeTypeIDSelect.value]
})

// 轮播图的飞机类型列表
let planeTypes = computed(() => {
  if (!dataSourcePlane.value) return  // 注意为空时返回
  return Object.keys(dataSourcePlane.value)
})

// 选择框中显示的数据列表
let planeIDsList = computed(() => {
  if (!dataSourcePlane.value) return // 注意为空时返回
  let list = dataSourcePlane.value[planeTypeShow.value]
  return Object.keys(list)
})

// 当前选中的飞机数据信息
let planeInfo = computed(() => {
  if (planeIDSelect.value == null) return ''
  let planeIdInfos = dataSourcePlane.value[planeTypeShow.value][planeIDSelect.value]
  // if (!planeIdInfos) return ''
  return planeIdInfos
})

// 鼠标悬停，显示缩略信息
const columnsInfo = ref([{
  title: '参数',
  key: 'param'
}, {
  title: '数值',
  key: 'value'
}])

// 鼠标悬停的缩略信息
let dataInfoPlane = computed(() => {
  if (!planeInfo.value) return
  return [{
    param: '飞机编号',
    value: planeInfo.value[0]['planeId']
  }, {
    param: '试车类型',
    value: planeInfo.value[0]['testType']
  }]
})


// 轮播图 标签页（发动机） 相关数据

let dataSourceEngine = computed(() => {
  if (!dataSource.value) return;

  // 生成结构化数据 存入dataSource中
  let groupByEngine1Type = groupListByKey(dataSource.value, 'engine1Model')
  for (let item in groupByEngine1Type) {
    groupByEngine1Type[item] = groupListByKey(groupByEngine1Type[item], 'engine1Id')
  }

  let groupByEngine2Type = groupListByKey(dataSource.value, 'engine2Model')
  for (let item in groupByEngine2Type) {
    groupByEngine2Type[item] = groupListByKey(groupByEngine2Type[item], 'engine2Id')
  }

  // 合并两组结构化数据
  for (let key in groupByEngine2Type) {
    if (!groupByEngine1Type[key]) groupByEngine1Type[key] = groupByEngine2Type[key]
    else groupByEngine1Type[key] = groupByEngine2Type[key].concat(groupByEngine1Type[key])
  }

  return groupByEngine1Type;
})

// 轮播图选中的发动机类型 下标
let engineTypeIDSelect = ref(0)
// 选择框选择的发动机编号
let engineIDSelect = ref(null)

// 轮播图正在展示的飞机类型
let engineTypeShow = computed(() => {
  return engineTypes.value[engineTypeIDSelect.value]
})

// 轮播图的飞机类型列表
let engineTypes = computed(() => {
  if (!dataSourceEngine.value) return  // 注意为空时返回
  return Object.keys(dataSourceEngine.value)
})

// 选择框中显示的数据列表
let engineIDsList = computed(() => {
  if (!dataSourceEngine.value) return // 注意为空时返回
  let list = dataSourceEngine.value[engineTypeShow.value]
  return Object.keys(list)
})

// 当前选中的飞机数据信息
let engineInfo = computed(() => {
  if (engineIDSelect.value == null) return undefined
  let engineIdInfos = dataSourceEngine.value[engineTypeShow.value][engineIDSelect.value]
  // if (!engineIdInfos) return ''
  return engineIdInfos
})

// 鼠标悬停的缩略信息
let dataInfoEngine = computed(() => {
  if (!engineInfo.value) return
  return [{
    param: '发动机编号',
    value: engineInfo.value[0]['planeId']
  }, {
    param: '试车类型',
    value: engineInfo.value[0]['testType']
  }]
})


// ----------------------  统计信息-左下角  ----------------------------
import planeSvg from "@/assets/plane.svg"
let card = ref([
  { name: '飞机类型', iconPath: planeSvg, info: null },
  { name: '飞机编号', iconPath: planeSvg, info: null },
  { name: '发动机类型', iconPath: planeSvg, info: null },
  { name: '发动机编号', iconPath: planeSvg, info: null },
  { name: '试飞时间', iconPath: planeSvg, info: null },
  { name: '试飞类型', iconPath: planeSvg, info: null },])


// ----------------------  线形图-右下角  ----------------------------
let chartData = ref([])

// 监听当前选中的飞机数据信息
watch([planeInfo, tabSelect], ([newInfo, newTab]) => {
  if (!newInfo || newTab == '发动机') {

    planeIDSelect.value = undefined
    planeTypeIDSelect.value = 0

    card.value[0].info = ''
    card.value[1].info = ''
    card.value[3].info = ''
    card.value[2].info = ''
    card.value[4].info = ''
    card.value[5].info = ''
    chartData.value = []
    return
  }

  console.log(newTab)

  let info = newInfo[0]
  card.value[0].info = info.planeModel
  card.value[1].info = info.planeId
  card.value[2].info = info.engine1Model + " " + info.engine2Model
  card.value[3].info = info.engine1Id + " " + info.engine2Id
  card.value[4].info = info.testTimeStart
  card.value[5].info = info.testType

  chartData.value = newInfo.reduce((arr, item) => {
    let tmp = [item.testTimeStart.split(" ")[0], item.testDuration]
    arr.push(tmp)
    return arr
  }, [])
})

// 监听当前选中的发动机数据信息
watch([engineInfo, tabSelect], ([newInfo, newTab]) => {
  if (newInfo == undefined || newTab == '飞机') {
    engineIDSelect.value = undefined
    engineTypeIDSelect.value = 0

    card.value[0].info = ''
    card.value[1].info = ''
    card.value[3].info = ''
    card.value[2].info = ''
    card.value[4].info = ''
    card.value[5].info = ''
    chartData.value = []
    return
  }

  let info = newInfo[0]
  card.value[0].info = info.planeModel
  card.value[1].info = info.planeId
  card.value[2].info = info.engine1Model + " " + info.engine2Model
  card.value[3].info = info.engine1Id + " " + info.engine2Id
  card.value[4].info = info.testTimeStart
  card.value[5].info = info.testType

  chartData.value = newInfo.reduce((arr, item) => {
    let tmp = [item.testTimeStart.split(" ")[0], item.testDuration]
    arr.push(tmp)
    return arr
  }, [])
})





// ----------------------  执行初始化mounted操作  ----------------------------
onMounted(async () => {
  // 加载数据
  let { data } = await dataInfoApi.getParamInfoList({
    planeModel: "",
    planeId: ""
  })

  dataSource.value = data;



  // let groupByEngine1Type = groupListByKey(data, 'engine1Model')
  // let groupByEngine2Type = groupListByKey(data, 'engine2Model')
})


</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

:deep(ivu-card-body) {
  padding: 0px;
}

.card {
  user-select: none;
  flex: 1 180px;
  // width: 180px;
  height: 80px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  border: $borderStyle;
  border-style: dashed;
  border-radius: 5px;
  overflow: hidden;

  & .left {
    flex: 1.1;
    word-break: keep-all;
  }

  & .right {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: start;

    color: blue;
    font-size: small;
    font-weight: bold;
  }

  & .icon-list {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-top: 5px;

    cursor: auto;
  }
}

.data-display-container {
  height: $dataDisplayHeight;
  width: 100%
}

.top {
  border: $borderStyle;
  width: 100%;
  height: $dataDisplayTopHeight;
  overflow: hidden;
}

.bottom {
  border: $borderStyle;
  width: 100%;
  height: $dataDisplayBottomHeight;
}

.top-left {
  display: block;
  float: left;
  border: $borderStyle;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: $dataDisplayTopLeftWidth;
  height: $dataDisplayTopHeight;

}

.top-right {
  display: inline-block;
  border: $borderStyle;
  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: calc(100% - $dataDisplayTopLeftWidth);
  height: $dataDisplayTopHeight;
  overflow: auto;
  z-index: 100;


}

.bottom-left {
  display: inline-block;

  z-index: -1;

  //  float: left;
  border: $borderStyle;
  border-right-width: 1px;

  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: $dataDisplayTopLeftWidth;
  height: $dataDisplayBottomHeight;

  overflow: scroll;
}

.wrapper-itmes {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 20px;
}

.bottom-right {
  display: inline-block;
  border: $borderStyle;
  border-bottom: 0px;
  border-left: 0px;
  border-top: 0px;

  width: calc(100% - $dataDisplayTopLeftWidth);
  height: $dataDisplayBottomHeight;
  overflow: scroll;
}



img {
  display: block;
  margin: auto;
  height: 150px;
  width: 270px;
  cursor: pointer;
}

.img {
  height: 150px;
  width: 270px;
}

.select-container {
  text-align: center;
  margin: 21px;
}

:deep(.ivu-select-single .ivu-select-selection) {
  height: 28px;
}
</style>
