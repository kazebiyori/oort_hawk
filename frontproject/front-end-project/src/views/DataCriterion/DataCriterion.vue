<template>

  <div class="container">
    <div class="left">
      <div class="left-top">
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </div>
      <div class="left-bottom">
        <div class="chart" ref="chart"></div>
      </div>
    </div>

    <div class="right">
      <Row justify="start" class="code-row-bg">
        <Col span="2" style="font-size:larger;vertical-align:top;">规则分布 > </Col>
        <Col span="1" class="selectItem">地勤</Col>
        <Col span="1" class="selectItem">技术</Col>
        <Col span="1" class="selectItem">计算</Col>
      </Row>
      <br>
      <Row justify="start" class="code-row-bg">
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
      </Row>
      <br>

      <Row justify="start" class="code-row-bg">
        <Col span="2" style="font-size:larger;vertical-align:top;">事件类型 > </Col>
        <Col span="2" class="selectItem">起飞依据</Col>
        <Col span="1" class="selectItem">记录</Col>
        <Col span="1" class="selectItem">警告</Col>
      </Row>


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



<style lang="scss" scoped>
@import '@/styles/variables.scss';

:deep(.ivu-table .table-info-error) {
  color: red;
}

:deep(.ivu-table .table-info-normal) {
  color: green;
}

.criterionTable {
  margin-top: 30px;
  border: $borderStyle;
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
  margin: 5px;
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
  border: $borderStyle;

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
</style>
