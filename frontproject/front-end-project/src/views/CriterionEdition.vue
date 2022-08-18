<template>
    <div class="div">
        <Form :model="formItem" label-width="80" label-colon inline>
            <div class="left">
                <div class="title">判据信息</div>
                <div class="firsrtline">
                    <FormItem label="类型" style="width: 280px;">
                        <Select v-model="formItem.type">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="版本" style="width: 280px;margin-left: 20px;">
                        <Select v-model="formItem.version">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                </div>
                <div class="secondline">
                    <FormItem label="编辑时间" style="width: 280px;">
                        <Input v-model="formItem.time" placeholder="时间" disabled></Input>
                    </FormItem>
                    <FormItem label="编辑人" style="width: 280px;margin-left: 20px;">
                        <Input v-model="formItem.people" placeholder="小王" disabled></Input>
                    </FormItem>
                </div>
                <FormItem label="简要描述" style="width: 590px">
                    <Input v-model="formItem.briefdescription" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="详细描述" style="width: 590px">
                    <Input v-model="formItem.cleardescription" placeholder="请输入" :rows="10" type="textarea"></Input>
                </FormItem>
                <FormItem>
                    <Button type="info" @click="toCriteriondisplay">提交</Button>
                    <Button style="margin-left: 8px" @click="toCriteriondisplay">取消</Button>
                </FormItem>
            </div>
            <div class="right">
                <div class="title">判据脚本
                    <span class="close">
                        <Button type="primary" @click="toCriteriondisplay">关闭</Button>
                    </span>
                </div>

                <FormItem style="width: 590px;margin-right: 0px;">
                    <Input v-model="formItem.newcriterion" placeholder="请输入" :rows="20" type="textarea"></Input>
                </FormItem>
            </div>
        </Form>



    </div>


</template>

<script>
export default {
    data() {
        return {
            formItem: {
                type: '',
                version: '',
                time: '',
                people: '',
                briefdescription: '',
                cleardescription: '',
                newcriterion: '',
            },
        }
    },
    methods: {
        toCriteriondisplay() {
            this.$router.push(`criteriondisplay`)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.div {
    width: calc($mainWithSideWidth - 60px);
    height: $mainWithoutSideWidth;
    margin: 10px auto;
}

.title {
    font-size: 20px;
    color: #000;
    font-weight: bold;
    margin-bottom: 20px;
}

.left {
    width: calc(($mainWithSideWidth - 60px)/2);
    float: left;
}

.right {
    width: calc(($mainWithSideWidth - 60px)/2);
    float: right;

    .title {
        margin-left: 100px;
    }

    .close {
        float: right;
    }
}
</style>
