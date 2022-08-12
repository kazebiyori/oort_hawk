<template>

  <div>
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

::v-deep .el-cascader {

  margin: auto !important
}
</style>
