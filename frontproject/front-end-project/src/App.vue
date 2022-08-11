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

  }
}
</script>

<style lang="scss" scoped>
</style>
