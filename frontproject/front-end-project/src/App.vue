<template>
  <router-view name="Authentication"></router-view>

  <div v-show="$route.fullPath != '/login' && $route.fullPath != '/register'">
    <navbar />
    <mainview />
  </div>
</template>

<script>

import { Navbar, Sidebar, Tagbar, Mainview } from '@/layout/index.js'
// import socket from "@/utils/websocket.js"
// import { NavbarLayout, MainviewLayout } from '@/layout/index.js'
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
    auto as followSystemColorScheme,
    exportGeneratedCSS as collectCSS,
    setFetchMethod
} from 'darkreader';


export default {
  components: {
    Navbar, Sidebar, Tagbar, Mainview
    // NavbarLayout, MainviewLayout

  },
  // 刷新页面，自动跳转到起始页面
  beforeCreate() {
    this.$router.push('/')
  },
  mounted() {
    setFetchMethod(window.fetch);
    enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
    // socket.send("onMounted");
    // console.log("sendMseeageSucess");
  }
}
</script>

<style lang="scss" scoped>
</style>
