<template>
  <div class="data-display-container">
    <div class="top">

      <!-- 轮播图 -->
      <div class="top-left">
        <Tabs>
          <TabPane label="飞机">
            <Carousel v-model="idSelectedList" scroll>
              <CarouselItem v-for="item in listPlaneType" :key="item">
                <img src="@/assets/img/像素-草坪.jpeg" :alt="item">
              </CarouselItem>
              <!-- <CarouselItem>
                <img src="@/assets/img/像素-夕阳.jpeg" alt="夕阳">
              </CarouselItem>
              <CarouselItem>
                <img src="@/assets/img/像素-草坪.jpeg" alt="草坪">
              </CarouselItem> -->
            </Carousel>
          </TabPane>

          <TabPane label="发动机">
            <Carousel v-model="idSelectedList2" scroll>
              <CarouselItem>
                <img src="@/assets/img/像素-街角.png" alt="街角">
              </CarouselItem>
              <CarouselItem>
                <img src="@/assets/img/像素-夕阳.jpeg" alt="夕阳">
              </CarouselItem>
            </Carousel>
          </TabPane>
        </Tabs>

        <div class="select-container">
          <Poptip placement="bottom-start" width="300" trigger="hover" title="数据详情">
            <label sytle="cursor: pointer;">飞机编号：</label>
            <template #content>
              <Table border :columns="columnsInfo" :data="dataInfo" width="500px"></Table>
            </template>
          </Poptip>
          <Select v-model="itemSelectPlaneNumber" style="width: 120px;z-index: 10">
            <Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
      </div>

      <div class="top-right">
        <Calendar @dayChange="dayChange" />
      </div>

    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div class="wrapper-itmes">
          <template v-for="item in card">
            <Card class="card">
              <div class="left">
                <div>{{ item.name }}</div>
                <img :src="item.iconPath" alt="#" class="icon-list">
              </div>
              <div class="right">{{ item.info }}</div>
            </Card>
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
import { ref, computed, watch, onMounted } from 'vue';
import Calendar from './components/Calendar.vue';
import LineChart from './components/LineChart.vue';
import { getFormatDay } from '@/utils/date';
import apiParam from '@/api/param';
import dataInfoApi from '@/api/dataInfo';

onMounted(() => {
  // getInfo();
})

// ----------------------  线形图-右下角  ----------------------------
let chartData = ref([])


// ----------------------  日历-右上角  ----------------------------
// 数据统计 起止时间
let startDate = ref('')
let endDate = ref('')
watch(startDate, (newVal) => {

})
function dayChange(payload) {
  startDate.value = getFormatDay(payload[0])
  endDate.value = getFormatDay(payload[1])
}



// ----------------------  轮播图-左上角  ----------------------------
// 鼠标悬停，显示缩略信息
const columnsInfo = ref([
  {
    title: '参数',
    key: 'param'
  },
  {
    title: '数值',
    key: 'value'
  }
])
const dataInfo = ref([
  {
    param: '飞机编号',
    value: 1
  }, {
    param: '试车类型',
    value: 'AAA'
  }, {
    param: 'xxx',
    value: 'xxx'
  },
])

// 轮播图 标签页（飞机） 列表序号
let idSelectedList = ref(0)
// 轮播图 标签页（发动机） 列表序号
let idSelectedList2 = ref(0)

// 轮播图 飞机类型 图片数量
let listPlaneType = ref([])

// 轮播图 选项列表 全部内容
// let listPlaneNumber = ref([['路径', '路灯', '草坪'], ['夕阳', '背影'], ['海', '自行车', '红蓝']])
let listPlaneNumber = ref([])
let listEngineNumber = ref([]);

// 轮播图 选项列表 选择项
const itemSelectPlaneNumber = ref('init')

// 轮播图 选项列表 显示内容
let selectList = computed(() => {
  return listPlaneNumber.value[idSelectedList.value]
})

// 初始化 数据请求
function getInfo() {
  apiParam.getInfoByPage({ page: "1", pageSize: "10" }).then((res) => {
    console.log('success', res);
  }).catch((err) => {
    console.log('err', err);
  })
}

// ----------------------  统计信息-左下角  ----------------------------
import planeSvg from "@/assets/plane.svg"
let card = ref([
  { name: '飞机类型', iconPath: planeSvg, info: null },
  { name: '飞机编号', iconPath: planeSvg, info: null },
  { name: '发动机类型', iconPath: planeSvg, info: null },
  { name: '发动机编号', iconPath: planeSvg, info: null },
  { name: '试飞时间', iconPath: planeSvg, info: null },
  { name: '试飞类型', iconPath: planeSvg, info: null },])

// ----------------------  执行初始化mounted操作  ----------------------------
onMounted(async()=>{
  // 加载飞机类型
  await dataInfoApi.getPlaneType()
    .then((res)=>{ 
       listPlaneType.value =  res.data
    }).catch((err)=>{
      this.$Message.info(err.msg || err);
    })

  // 获取飞机类型对应编号
  for(let i =0; i< listPlaneType.value.length; i++){
    let res = await dataInfoApi.getPlaneNumber({planeModel: listPlaneType.value[i]})
    listPlaneNumber.value.push(res.data)

  }
  // listPlaneType.value.forEach(async(item)=>{
  //   await dataInfoApi.getPlaneNumber({planeModel: item})
  //   .then((res)=>{ 
  //      listPlaneNumber.value.push(res.data)
  //   }).catch((err)=>{
  //     console.log(err);
  //     // this.$Message.info(err.msg || err);
  //   })
  // })
})

watch(itemSelectPlaneNumber, async(newVal)=>{
  if(!newVal) return 
  // 通过飞机类型和飞机编号 获取飞参数据信息
  let {data: listId} = await dataInfoApi.getParamID({planeModel: listPlaneType.value[[idSelectedList.value]], planeID: newVal})
  console.log(listId);
  let id = listId[0].id
  
  let {data} = await dataInfoApi.getParamInfoSingle({id:id})

  // 更新左下数据
  card.value[0].info=data.planeModel
  card.value[1].info=data.planeId
  card.value[2].info=data.engine1Model + " " + data.engine2Model
  card.value[3].info=data.engine1Id + " " + data.engine2Id
  card.value[4].info=data.testTimeStart
  card.value[5].info=data.testType

  // 更新右下数据
// let chartData = ref([["2022-07-02",10],["2022-07-10",10]])

  dataInfoApi.getParamInfoList({planeModel: listPlaneType.value[[idSelectedList.value]], planeID: newVal})
    .then((res)=>{
      console.log(res);
      let {data} = res
      let tmp = [];
      data.forEach((item) => {
        tmp.push([item.testTimeStart.split(" ")[0], item.testDuration])
      })
      
      chartData.value = tmp;

      console.log(tmp);
    })
    .catch((err)=>{
      console.log(err);
    })

})


</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card {
  width: 180px;
  height: 80px;

  display: inline-block;
  border: $borderStyle;
  border-style: dashed;
  overflow: hidden;

  & .left {
    display: inline-block;
  }

  & .right {
    display: block;
    float: right;
    text-align: center;
    line-height: 42px;
    width: 70px;
    height: 42px;
    color: blue;
    font-weight: bolder;
    font-size: smaller;
    position: relative;
    bottom: 15px;
  }

  & .icon-list {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-top: 5px;
    float: left;

    &:hover {
      background-color: none;
    }
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


  overflow: scroll;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 25px;
  gap: 2rem;
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
  width: 250px;
  cursor: pointer;
}

.select-container {
  text-align: center;
  margin: 21px;
}

:deep(.ivu-select-single .ivu-select-selection) {
  height: 28px;
}
</style>
