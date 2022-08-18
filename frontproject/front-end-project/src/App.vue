<template>
  <div>
    <navbar />
    <mainview />
  </div>

  <!-- <div>
    <NavbarLayout></NavbarLayout>
    <MainviewLayout></MainviewLayout>
  </div> -->

</template>

<script>

import { Navbar, Sidebar, Tagbar, Mainview } from '@/layout/index.js'
// import { NavbarLayout, MainviewLayout } from '@/layout/index.js'


export default {
  components: {
    Navbar, Sidebar, Tagbar, Mainview
    // NavbarLayout, MainviewLayout

  },
  // 刷新页面，自动跳转到起始页面
  beforeCreate() {
    this.$router.push('/datadisplay')
  },
}
</script>

<style lang="scss" scoped>
</style>
