<template>
    <div class="datafilter">
        <div class="button">
            <Button>重置</Button>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="single1"></Checkbox>
            <span class="selecttips">飞机型号</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="model" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="single"></Checkbox>
            <span class="selecttips">发动机型号</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="model" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="single"></Checkbox>
            <span class="selecttips">试车类型</span>
            <!-- 下拉选择 -->
            <div class="select">
                <Select v-model="model" style="width:$sidebarFilterPanelWidth">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <div class="choosegroup">
            <!-- 复选框 -->
            <Checkbox v-model="single"></Checkbox>
            <span class="selecttips">日期</span>
            <!-- 下拉选择 -->
            <div class="select">
                <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="Select date"
                    style="width: $sidebarFilterPanelWidth" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //   复选框
            single: false,
            // 前三个选项的数据
            value: '',
            cityList: [
                {
                    value: 'Option1',
                    label: 'Option1',
                },
                {
                    value: 'Option2',
                    label: 'Option2',
                },
                {
                    value: 'Option3',
                    label: 'Option3',
                },
                {
                    value: 'Option4',
                    label: 'Option4',
                },
                {
                    value: 'Option5',
                    label: 'Option5',
                },
            ],
            // 时间选择
            value1: '',
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.datafilter {
    height: $sidebarHeight;
    overflow: scroll;
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
