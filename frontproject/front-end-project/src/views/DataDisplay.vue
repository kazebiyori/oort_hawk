<template>
  <h1>datadisplay</h1>
  <el-button @click="n++">{{ n }}</el-button>

</template>

<script>
import { Datadisplay } from '.'

export default {
  name: 'Datadisplay',
  data() {
    return {
      n: 0
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
