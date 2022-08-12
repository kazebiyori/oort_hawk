<template>

  <div>

  <el-tree
    :props="props"
    :data="dataList"
    show-checkbox
    @check-change="handleCheckChange"
    default-expand-all
  />
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
        children: 'Children',
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
