<style>
.layout-header {
  background-color: rgb(255, 255, 255);
  height: 40px;
  line-height: auto;
}

.layout-footer {
  background-color: rgb(255, 255, 255);
  height: 300px;
}

.layout-content {
  background-color: rgb(255, 255, 255);
  height: 200px;
}

#fir {
  background-color: #3399ff;
  width: 8px;
  color: #3399ff;
}

.title {
  margin: 10px 25px;
  font-weight: 700;
  color: black;
}

.upOne {
  margin: 10px 100px;
  background-color: blueviolet;
}

span {
  float: left;
}

#search {
  float: right;
}

#sec {
  margin: 6px 5px;
  color: rgba(0, 0, 0, 0.442);
}

.upTwo {
  background-color: aquamarine;
  content: '';
  display: block;
  clear: both;
  width: 1100px;
  margin: 0px auto;
}
</style>
<template>
  <div class="layout-base">
    <Layout>
      <div class="layout-header">
        <div class="title"><span id="fir">1</span>上传要导入的数据文件</div>
      </div>
      <div class="layout-content">
        <div class="upOne">
          <span id="fg">
            <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
              <Button>上传文件</Button>
            </Upload>
          </span>
          <span id="sec">支持批量上传，上传格式为txt，phy，dat</span>
        </div>
        <div class="upTwo">
          <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="md-cloud-upload" size="70" style="color: #3399ff"></Icon>
              <p>点击上方“上传文件”或将文件拖拽到此区域</p>
            </div>
          </Upload>
        </div>
      </div>
      <div class="layout-footer">
        <ButtonGroup>
          <Button type="primary">全部文件</Button>
          <Button>已完成</Button>
          <Button>正在上传</Button>
          <Button>已取消</Button>
        </ButtonGroup>
        <span id="search">
          <Input v-model="value" icon="ios-search" placeholder="请输入文件名称进行搜索" style="width: 250px" />
        </span>
        <div>
          <Table ref="selection" height="350" :columns="columns" :data="data"></Table>
        </div>

      </div>
    </Layout>
  </div>
</template>
<script>
import { resolveComponent } from 'vue'
export default {
  data() {
    return {
      value: '',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '文件名',
          key: 'name'
        }, {
          title: '原始目录',
          key: 'dir'
        }, {
          title: '文件大小',
          key: 'size'
        }, {
          title: '类型',
          key: 'type'
        },
        {
          title: '状态',
          key: 'status'
        }, {
          title: '日期',
          key: 'date'
        },
        {
          title: 'Action',
          key: 'action',

          width: 160,
          render: (h, params) => {
            return h('div', [
              h(resolveComponent('Button'), {
                props: {

                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
              }, {
                default() {
                  return 'view'
                }

              }),
              h(resolveComponent('Button'), {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, {
                default() {
                  return 'edit'
                }
              })
            ]);
          }
        }
      ],

      data: [
        {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        }, {
          name: 'John Brown',
          dir: 'D:/',
          size: '818Kb',
          type: 'TXT',
          status: '已完成',
          date: '2022-11-02'
        },
      ]
    }

  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  }

}





</script>
