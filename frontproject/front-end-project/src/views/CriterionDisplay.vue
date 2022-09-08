<template>
  <div class="div">
    <div class="title">
      判据浏览
    </div>
    <div class="criterionveiwbody">
      <div class="criterionseletor">
        <Form :model="formItem" label-width="80" label-colon inline>
          <div class="firsrtline">
            <FormItem label="判据编号" style="width: 280px;margin-left: 20px;">
              <Input v-model="formItem.criterionorder" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="类型" style="width: 280px;margin-left: 20px;">
              <Select v-model="formItem.type">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="编辑日期" style="margin-left: 45px;">
              <DatePicker type="daterange" :options="options2" placement="bottom-end" placeholder="请选择日期"
                style="width: 280px" v-model="formItem.date" />
            </FormItem>
          </div>
          <div class="secondline">
            <FormItem label="简述" style="width: 280px;margin-left: 20px;">
              <Input v-model="formItem.description" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="状态" style="width: 280px;margin-left: 20px;">
              <Select v-model="formItem.status">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="编辑人" style="width: 280px;margin-left: 45px;">
              <Select v-model="formItem.people">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary">查询</Button>
              <Button style="margin-left: 8px">重置</Button>
            </FormItem>
          </div>

        </Form>
      </div>
      <div class="functionbutton">
        <Button type="info" @click="tocriterionedit">+新建</Button>
        <Button type="success" @click="batchenable(index)">批量启用</Button>
        <Button type="info" @click="batchdisable(index)">批量禁用</Button>
        <Button type="error" style="background-color: pink;border-color: pink;"
          @click="batchremove(tableChecked.map(i => i.id))">批量删除</Button>
        <Button>...</Button>
      </div>

      <div class="tips">
        <Alert show-icon style="height: 32px;width:inherit;">
          <span class="text">
            已选择3项
          </span>
          <span class="clear">清空</span>
        </Alert>
      </div>

      <div class="selectedlist">
        <Table border :columns="columns" :data="data" @on-select="handleSelectionChange">
          <template #action="{ row, index }">
            <Button type="error" size="small" @click="tocriterionedit">编辑</Button>
            <Button type="error" size="small">启用</Button>
            <Button type="error" size="small" @click="remove(index)"
              style="background-color: pink;border-color: pink;">删除</Button>
          </template>
        </Table>

      </div>
      <div class="listpages">

        <Page :total="40" size="small" show-total show-elevator show-sizer />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      // tableChecked: [],
      // deleteIds: [],
      // deleteUserFormVisible: false,
      formItem: {
        criterionorder: '',
        type: '',
        date: '',
        description: '',
        status: '',
        people: '',

      },
      columns: [
        {
          type: 'selection',
          // width: 120,
          align: 'center',
          resizable: true,
        },
        {
          title: 'criterionorder',
          key: 'criterionorder',
          // width: 200,
          align: 'center',
          resizable: true,
        },
        {
          title: 'type',
          key: 'type',
          // width: 120,
          align: 'center',
          resizable: true,
          filters: [
            {
              label: 'AI',
              value: 'AI'
            },
            {
              label: '专家',
              value: '专家'
            }
          ],
          filterMethod(value, row) {
            return row.type.indexOf(value) > -1;
          }
        },
        {
          title: 'description',
          key: 'description',
          // width: 170,
          align: 'center',
          resizable: true,
        },
        {
          title: 'status',
          key: 'status',
          // width: 120,
          align: 'center',
          resizable: true,
          filters: [
            {
              label: '启用中',
              value: '启用中'
            },
            {
              label: '禁用中',
              value: '禁用中'
            }
          ],
          filterMethod(value, row) {
            return row.status.indexOf(value) > -1;
          }
        },
        {
          title: 'date',
          key: 'date',
          sortable: true,
          // width: 200,
          align: 'center',
          resizable: true,
        },
        {
          title: 'people',
          key: 'people',
          // width: 120,
          align: 'center',
          resizable: true,
          filters: [
            {
              label: '小王',
              value: '小王'
            },
            {
              label: '小李',
              value: '小李'
            }
          ],
          filterMethod(value, row) {
            return row.people.indexOf(value) > -1;
          }
        },
        {
          title: 'action',
          slot: 'action',
          width: 205,
          align: 'center'
        },
      ],
      data: [
        {
          criterionorder: 'RuleConde22',
          type: '专家',
          date: '2022-07-22  16:14:28',
          description: '一段判据描述',
          status: '禁用中',
          people: '小王',
        },
        {
          criterionorder: 'RuleConde22',
          type: 'AI',
          date: '2022-07-22  16:10:29',
          description: '一段判据描述',
          status: '启用中',
          people: '小李',
        },
        {
          // check: 'false',
          criterionorder: 'RuleConde22',
          type: 'AI',
          date: '2022-07-22  16:10:29',
          description: '一段判据描述',
          status: '启用中',
          people: '小李',
        }
      ]
    }

  },

  methods: {
    tocriterionedit() {
      this.$router.push(`criterionedition`);
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    handleSelectionChange(val) {

    },
    batchenable(index) {

    },
    batchdisable(index) {

    },
    batchremove(rows) {
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   var j = i;
      //   var id = this.tableChecked[j].id;
      //   this.deleteIds.push(id);
      // }
      // this.deleteIds = [];
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
  font-size: 24px;
  color: blue;
  font-weight: bold;
  margin-bottom: 20px;
}

.functionbutton {
  Button {
    margin-left: 15px;
  }
}

.tips {
  margin: 20px auto;
  float: none;
}

.tips .clear {
  color: blue;
  margin-left: 10px;
}

.selectedlist {
  Button {
    margin-left: 5px;
  }
}

.listpages {
  margin-top: 20px;
  padding-right: 20px;
}
</style>
