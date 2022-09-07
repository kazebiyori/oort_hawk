<template>
    <div class="datafilter">
        <div class="button">
            <Button @click="clearFilter">重置</Button>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="checkBoxs.planeModel"></Checkbox>
            <span class="selecttips">飞机型号</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="selected.planeModel" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in option.planeModel" :value="item" :key="item">{{ item }}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="checkBoxs.engine1Model"></Checkbox>
            <span class="selecttips">发动机型号</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="selected.engine1Model" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in option.engine1Model" :value="item" :key="item">{{ item }}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="checkBoxs.testType"></Checkbox>
            <span class="selecttips">试车类型</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="selected.testType" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in option.testType" :value="item" :key="item">{{ item }}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="checkBoxs.timeRange"></Checkbox>
            <span class="selecttips">日期</span>
            <!-- 下拉选择 -->
            <div class="select">
                <DatePicker type="daterange" v-model="selected.timeRange" placement="bottom-end"
                    placeholder="Select date" style="width: 200px" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject, watch } from "vue"
const emitter = inject("$emitter")

let checkBoxs = ref({ planeModel: false, engine1Model: false, testType: false, timeRange: false })
let option = ref({ planeModel: [], engine1Model: [], testType: [] })
let selected = ref({ planeModel: "", engine1Model: "", testType: "", timeRange: "" })

function clearFilter() {
    checkBoxs.value = { planeModel: false, engine1Model: false, testType: false, timeRange: false }
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
