<template>
  <div>
    <el-tree empty-text="数据为空" :props="props" :data="dataDisplay" show-checkbox @check-change="handleCheckChange"
      @check="handleCheck" default-expand-all check-on-click-node :filter-node-method="filterMethod" />
  </div>
</template>

<script setup>
// import { mapActions, mapMutations, mapState } from 'vuex'
import { ref, computed, onMounted, inject } from "vue"
import dataInfoApi from "@/api/dataInfo"
import { getGroupForm, getItemList } from "@/utils/dataPreProcessing"
import moment from "moment";



// 定义数据列表属性
const props = ref({
  label: "testTimeStart",
  children: 'children',
})

// 显示数据列表
let data = ref([
])

let groupType = ref()

let filter = ref({ check: "", select: "" })

// 显示最终的数据 分组
let dataDisplay = computed(() => {
  if (groupType.value == 1) {
    return getGroupForm(filterData.value, "planeId", props.value.label)
  } else if (groupType.value == 2) {
    return getGroupForm(filterData.value, "engine1Model", props.value.label)
  } else {
    return filterData.value
  }
})

// 过滤数据，并将其传递给最终显示数据
let filterData = computed(() => {
  return data.value.filter((item) => {
    let result = true;
    for (let key in filter.value.check) {
      if (filter.value.check[key] == true) {
        if (key == "timeRange") {
          console.log(item["testTimeStart"])
          let currentMoment = moment(item["testTimeStart"], "YYYY-MM-DD hh:mm:ss")
          let beginMoment = moment(filter.value.select[key][0])
          let endMoment = moment(filter.value.select[key][1])

          console.log(currentMoment, beginMoment, endMoment);

          if (currentMoment < beginMoment || currentMoment > endMoment) {
            return false;
          }
        }
        else {
          if (item[key] != filter.value.select[key]) {
            return false;
          }
        }
      }
    }
    return result
  })
})

// 相应变化节点
function handleCheckChange(data, checked, indeterminate) {
  // 选择新数据
  emitter.emit("chooseNewData", { data, checked })
}
function handleCheck(data, item) {
}
function filterMethod(value, data, node) {
}



// 初始化操作
onMounted(() => {
  dataInfoApi.getParamInfoList({
    planeModel: "",
    planeId: ""
  }).then(res => {
    data.value = res.data;
    data.value.sort((a, b) => {
      return moment(a.testTimeStart) - moment(b.testTimeStart)
    })
    emitter.emit("initFilterPane", getItemList(data.value))
  }).catch(err => {
    console.log(err);
  })

})

// 获取事件总线
const emitter = inject("$emitter")
emitter.on("groupByPlaneType", () => {
  groupType.value = 1;
})
emitter.on("groupByEngineType", () => {
  groupType.value = 2;
})

let direction = true;
emitter.on("sortByPlaneTime", () => {
  if (direction) {
    data.value.sort((a, b) => {
      return moment(b.testTimeStart) - moment(a.testTimeStart)
    })
  } else {
    data.value.sort((a, b) => {
      return moment(a.testTimeStart) - moment(b.testTimeStart)
    })
  }
  direction = !direction
  let tmp = data.value
  data.value = ""
  data.value = tmp
})

emitter.on("clearGroup", () => {
  groupType.value = 0;
})


emitter.on("filterData", (payload) => {
  filter.value.check = payload.check
  filter.value.select = payload.select
})


</script>

<style lang="scss" scoped>

</style>
