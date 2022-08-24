<template>

  <div class="container">
    <div class="left">
      <div class="left-top">
        <template v-for="itemData in itemDatas">
          <Item :itemData="itemData"></Item>
        </template>
      </div>
      <div class="left-bottom">
        <div class="chart" ref="chart"></div>
      </div>
    </div>

    <div class="right">
      <!-- <Row justify="start" class="code-row-bg">
        <Col span="2" style="font-size:larger;vertical-align:top;">规则分布 > </Col>
        <Col span="1" class="selectItem">地勤</Col>
        <Col span="1" class="selectItem">技术</Col>
        <Col span="1" class="selectItem">计算</Col>
      </Row> -->

      <TagSelect v-model="value1" hide-check-all>
        <span class="selecttips">规则分布 ></span>
        <TagSelectOption name="tag1">地勤</TagSelectOption>
        <TagSelectOption name="tag2">技术</TagSelectOption>
        <TagSelectOption name="tag3">计算</TagSelectOption>
      </TagSelect>
      <br>
      <!-- <Row justify="start" class="code-row-bg">
        <Col span="2" style="font-size:larger;vertical-align:top;">规则类型 > </Col>
        <Col span="1" class="selectItem">启动</Col>
        <Col span="1" class="selectItem">慢车</Col>
        <Col span="1" class="selectItem">节流</Col>
        <Col span="1" class="selectItem">中间</Col>
        <Col span="1" class="selectItem">压力</Col>
        <Col span="2" class="selectItem">加减速</Col>
        <Col span="2" class="selectItem">特殊过程</Col>
        <Col span="1" class="selectItem">传感器</Col>
        <Col span="1" class="selectItem">性能</Col>
        <Col span="1" class="selectItem">寿命</Col>
      </Row> -->
      <TagSelect v-model="value2" hide-check-all>
        <span class="selecttips">规则类型 ></span>
        <TagSelectOption name="tag1">启动</TagSelectOption>
        <TagSelectOption name="tag2">慢车</TagSelectOption>
        <TagSelectOption name="tag3">节流</TagSelectOption>
        <TagSelectOption name="tag4">中间</TagSelectOption>
        <TagSelectOption name="tag5">压力</TagSelectOption>
        <TagSelectOption name="tag6">加减速</TagSelectOption>
        <TagSelectOption name="tag7">特殊过程</TagSelectOption>
        <TagSelectOption name="tag8">传感器</TagSelectOption>
        <TagSelectOption name="tag9">性能</TagSelectOption>
        <TagSelectOption name="tag10">寿命</TagSelectOption>
      </TagSelect>
      <br>

      <!-- <Row justify="start" class="code-row-bg">
        <Col span="2" style="font-size:larger;vertical-align:top;">事件类型 > </Col>
        <Col span="2" class="selectItem">起飞依据</Col>
        <Col span="1" class="selectItem">记录</Col>
        <Col span="1" class="selectItem">警告</Col>
      </Row> -->
      <TagSelect v-model="value3" hide-check-all>
        <span class="selecttips">事件类型 ></span>
        <TagSelectOption name="tag1">起飞依据</TagSelectOption>
        <TagSelectOption name="tag2">记录</TagSelectOption>
        <TagSelectOption name="tag3">警告</TagSelectOption>

      </TagSelect>
      <Button @click="handleUnCheckAll" style="float:right;width:90px;text-align: center" type="primary">取消筛选</Button>

      <Tabs value="name1" class="criterionTable">
        <TabPane label="飞机1" name="name1">
          <Table border :columns="columns" :data="data"></Table>
        </TabPane>
        <TabPane label="飞机2" name="name2">
          <Table border :columns="columns" :data="data"></Table>
        </TabPane>
        <TabPane label="飞机3" name="name3">
        </TabPane>
      </Tabs>
    </div>
  </div>


</template>

<script setup>
import Item from './components/Item.vue'
import { ref, onMounted, inject, watch, defineProps, computed } from 'vue';
// 从根组件获取组件
const echarts = inject('$echarts')
// 获取图表dom组件
const chart = ref(null)
// 待初始化的日历对象
let myChart = null
let chartConfigInit = {
  title: {
    text: '结果分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    x: 'right',
    y: 'bottom',
    orient: 'vertical',
  },
  series: [
    {
      // name: '统计分布',
      type: 'pie',
      radius: '65%',
      center: ['45%', '60%'],
      data: [
        { value: 1048, name: '警告', itemStyle: { color: '#F2CA6B' } },
        { value: 735, name: '记录', itemStyle: { color: '#5A6FC0' } },
        { value: 580, name: '正常', itemStyle: { color: '#9ECA7F' } },
        { value: 484, name: '异常', itemStyle: { color: '#DE6E6A' } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {  //删除指示线
        show: false
      },
      label: {
        show: false
      }
    }
  ]
};
// 初始化操作
onMounted(() => {
  console.log('init');

  chart.value.focus()
  myChart = echarts.init(chart.value)
  myChart.setOption(
    chartConfigInit
  )

  // 卡顿
  window.onresize = function () {
    myChart.resize();
  };
})

// 左上角列表数据
let itemDatas = ref([
  {
    label: '数据1',
    name: 'GS型飞机',
    number: '1234',
    numberEngine: '123',
    typeEngine: '999',
    typeTrial: '启动',
    dateTrial: '2021.09.01'
  },
  {
    label: '数据2',
    name: 'GS型飞机',
    number: '1234',
    numberEngine: '1323',
    typeEngine: '9399',
    typeTrial: '启动',
    dateTrial: '2021.09.01'
  },
  {
    label: '数据1',
    name: 'GS型飞机',
    number: '1234',
    numberEngine: '1123',
    typeEngine: '999',
    typeTrial: '启动',
    dateTrial: '2021.09.01'
  }
])

//  右下角判据表格
const columns = [
  {
    title: '文件名',
    key: 'fileName'
  },
  {
    title: '事件ID',
    key: 'eventID'
  },
  {
    title: '事件名称',
    key: 'eventName'
  },
  {
    title: '事件类型',
    key: 'eventType',
  },
  {
    title: '判据分类',
    key: 'criterionGroup'
  },
  {
    title: '判读结果',
    key: 'criterionResult'
  },
  {
    title: '记录信息',
    key: 'record'
  },
  {
    title: '专家建议',
    key: 'exportAdvice',
    tooltip: true
  },
  {
    title: '判据描述',
    key: 'criterionDescription',
    tooltip: true

  },
]

const data = [
  {
    fileName: 'b1_23',
    eventID: 'RGB',
    eventName: '地勤规则',
    eventType: '地勤',
    criterionGroup: '',
    criterionResult: '正常',
    record: '-1.11',
    exportAdvice: '一大堆一大堆一大堆一大堆一大堆一大堆',
    criterionDescription: '一大堆一大堆一大堆一大堆一大堆一大堆',
    cellClassName: {
      criterionResult: 'table-info-normal',
    }
  },
  {
    fileName: 'b1_23',
    eventID: 'RGB',
    eventName: '地勤规则',
    eventType: '地勤',
    criterionGroup: '',
    criterionResult: '正常',
    record: '-1.11',
    exportAdvice: '一大堆一大堆一大堆一大堆一大堆一大堆',
    criterionDescription: '一大堆一大堆一大堆一大堆一大堆一大堆',
    cellClassName: {
      criterionResult: 'table-info-normal',
    }

  },
  {
    fileName: 'b1_23',
    eventID: 'RGB',
    eventName: '地勤规则',
    eventType: '技术',
    criterionGroup: '',
    criterionResult: '异常',
    record: '-1.11',
    exportAdvice: '一大堆一大堆一大堆一大堆一大堆一大堆',
    criterionDescription: '一大堆一大堆一大堆一大堆一大堆一大堆',
    cellClassName: {
      criterionResult: 'table-info-error',
    }
  },
]

</script>



<style lang="scss" scoped >
@import '@/styles/variables.scss';

:deep(.ivu-table .table-info-error) {
  color: red;
}

:deep(.ivu-table .table-info-normal) {
  color: green;
}

.criterionTable {
  margin-top: 32px;
  //]border: $borderStyle;
}

.selectItem {
  position: relative;
  top: 3px;
}

.chart {
  width: 90%;
  height: 80%;
  margin: 10px auto;
}

.item {
  margin: 10px;
  border: $borderStyle
}

.container {
  height: 100%;
  width: 100%;
  // background-color: yellow;
}

.left {
  display: inline-block;
  height: 100%;
  width: 25%;
  // background-color: blue;
  // border: $borderStyle;

}

.left-top {
  height: 50%;
  //background-color: antiquewhite;
  overflow: auto;
  border: $borderStyle;
  //padding: 20px;

}

.left-bottom {
  height: 50%;
  background-color: white;
  overflow: auto;
  border: $borderStyle;

}

.right {
  display: inline-block;
  height: 100%;
  width: 75%;
  //background-color: pink;
  overflow: auto;
  border: $borderStyle;
  padding: 30px 10px;



}

.selecttips {
  font-size: 18px;
  margin-left: 20px;
  margin-right: 15px;
  vertical-align: top;
}

:deep(.ivu-tag) {
  font-size: 16px;
}
</style>
<script>
export default {
  data() {
    return {
      value1: [],
      value2: [],
      value3: []
    }
  },
  methods: {
    handleUnCheckAll() {
      this.value1 = [];
      this.value2 = [];
      this.value3 = [];
    }
  }
}
</script>