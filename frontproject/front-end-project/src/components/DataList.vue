<template>
  <!-- <el-button @click="data = data.sort((a, b) => (b.id - a.id))">sort</el-button>
  <el-button @click="data = data.filter((item => (item.id == 1)))">filter</el-button>
  <el-button @click="data = data_bk2">clear</el-button> -->
  <!-- <br>
  {{ dataList }}
  <br> -->


  <div class="op-container">

    <el-icon @click="showFilter = !showFilter" class="icon-right" :size="20">
      <Filter />
    </el-icon>

    <el-icon class="icon-right" :size="20">
      <Sort />
    </el-icon>

  </div>

  <div>
    <div class="el-container">
      <el-cascader class="cascader" v-if="showFilter" placeholder="筛选" v-model="optionsValue" :options="optionsCascader"
        :props="propsCascader" filterable clearable collapse-tags />
    </div>

    <el-tree-v2 :data="dataList" :props="props" show-checkbox highlight-current :height="dataHeight">
      <template #default="{ node }">
        <el-icon :size="12">
          <WindPower />
        </el-icon>
        <span>{{ node.label }}</span>
      </template>
    </el-tree-v2>
  </div>



</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      showFilter: true,
      optionsValue: {},
      optionsCascader: [
        {
          value: 1,
          label: '飞机型号',
          children: [
            {
              value: 2,
              label: '型号1'
            },
            {
              value: 3,
              label: '型号2'
            },
          ]
        },
        {
          value: 1,
          label: '发动机型号',
          children: [
            {
              value: 2,
              label: '型号1'
            },
            {
              value: 3,
              label: '型号2'
            },
          ]
        }
      ],
      propsCascader: {
        multiple: true
      },
      props: {
        value: 'ID',
        label: 'Name',
        children: 'children',
      }
    }
  },
  // watch: {
  //   data(newVal) {
  //     dataDisplay = newVal
  //   }
  // },
  computed: {
    dataHeight() {
      return document.body.clientHeight * 2 / 3
    },
    ...mapState({
      dataList: state => state.data.dataList
    }),
    filteredData() {
      let data = this.data
      return data
    }
  },
  methods: {
    ...mapActions([
      'initDataList'
    ])
  },
  created() {
    this.initDataList()
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  text-align: center;
  margin: 10px;

  &.cascader {
    display: block !important;
    margin: auto
  }
}

.op-container {
  margin: 10px;
  overflow: hidden;
}

.icon-left {
  cursor: pointer;
  float: left;
}

.icon-right {
  cursor: pointer;
  float: right;
}

::v-deep .el-cascader {

  margin: auto !important
}
</style>
