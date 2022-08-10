<template>
  <div>
    <sidebar />
    <navbar />
    <tagbar />
    <mainview />
  </div>


</template>

<script>

import { Navbar, Sidebar, Tagbar, Mainview } from '@/components/index.js'

export default {
  components: {
    Navbar, Sidebar, Tagbar, Mainview
  }
}
</script>

<style lang="scss" scoped>
</style>
