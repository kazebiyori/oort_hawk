<template>
  <div class="datafilter">
    <Form ref="formRef" :model="datafilter" class="content">
      <div class="button">
        <FormItem>
          <MyButton @click="clearFilter" style="width:50px;height:25px;font-family: sans-serif;">重置</MyButton>
        </FormItem>
      </div>
      <div class="choosegroup">
        <!-- 复选框 -->
        <FormItem prop="planeModel">
          <Checkbox v-model="datafilter.checkBoxs.planeModel"></Checkbox>

          <span class="selecttips">飞机型号</span>
          <!-- 下拉选择 -->
          <div class="select">
            <Select v-model="datafilter.selected.planeModel" style="width:$sidebarFilterPanelWidth">
              <Option v-for="item in option.planeModel" :value="item" :key="item">{{ item }}
              </Option>
            </Select>
          </div>
        </FormItem>
      </div>
      <div class="choosegroup">
        <!-- 复选框 -->
        <FormItem prop="engine1Model">
          <Checkbox v-model="datafilter.checkBoxs.engine1Model"></Checkbox>
          <span class="selecttips">发动机型号</span>
          <!-- 下拉选择 -->
          <div class="select">
            <Select v-model="datafilter.selected.engine1Model" style="width:$sidebarFilterPanelWidth">
              <Option v-for="item in option.engine1Model" :value="item" :key="item">{{ item }}
              </Option>
            </Select>
          </div>
        </FormItem>
      </div>
      <div class="choosegroup">
        <!-- 复选框 -->
        <FormItem prop="testType">
          <Checkbox v-model="datafilter.checkBoxs.testType"></Checkbox>
          <span class="selecttips">试车类型</span>
          <!-- 下拉选择 -->
          <div class="select">
            <Select v-model="datafilter.selected.testType" style="width:$sidebarFilterPanelWidth">
              <Option v-for="item in option.testType" :value="item" :key="item">{{ item }}
              </Option>
            </Select>
          </div>
        </FormItem>
      </div>
      <div class="choosegroup">
        <!-- 复选框 -->
        <FormItem prop="timeRange">
          <Checkbox v-model="datafilter.checkBoxs.timeRange"></Checkbox>
          <span class="selecttips">日期</span>
          <!-- 下拉选择 -->
          <div class="select">
            <DatePicker type="daterange" v-model="datafilter.selected.timeRange" placement="bottom-end"
              placeholder="Select date" style="width: 200px" />
          </div>
        </FormItem>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from "vue"
import MyButton from '@/components/MyButton.vue'

const emitter = inject("$emitter")

let checkBoxs = ref({ planeModel: false, engine1Model: false, testType: false, timeRange: false })
let option = ref({ planeModel: [], engine1Model: [], testType: [] })
let selected = ref({ planeModel: "", engine1Model: "", testType: "", timeRange: "" })
let datafilter = ref({ checkBoxs, selected })
let formRef = ref(null)
function clearFilter() {
  checkBoxs.value = { planeModel: false, engine1Model: false, testType: false, timeRange: false }
  selected.value = { planeModel: "", engine1Model: "", testType: "", timeRange: "" }
  emitter.emit("filterData", { check: checkBoxs.value, select: selected.value })
}

onMounted(() => {
  emitter.emit("filterData", { check: checkBoxs.value, select: selected.value })
})

emitter.on("initFilterPane", (payload) => {
  option.value = payload
})

</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.content {
  width: $sidebarFilterPanelWidth;
}

.selecttips {
  position: relative;
  bottom: 2px;
}

.datafilter {
  height: $sidebarHeight;
  overflow: auto;
}

.button {
  margin-top: 10px;
  margin-left: calc($sidebarFilterPanelWidth - 80px);
}

.choosegroup {
  margin: 30px 15px 50px 15px;
}

.select {
  margin-top: 10px;
}
</style>
