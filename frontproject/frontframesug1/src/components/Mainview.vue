<template>

  <div class="mainview">
    <div class="fix">
      <Sidebarfixed></Sidebarfixed>
    </div>
    <div class="active">
      <Sidebaractive></Sidebaractive>

    </div>

    <div class="main">
      <div class="top">
        <Maintop></Maintop>
      </div>
      <div class="bottom">
        <Mainbottom></Mainbottom>
      </div>

    </div>
  </div>


</template>

<script>
import { Sidebarfixed, Sidebaractive, Maintop, Mainbottom } from '@/components/index.js'

export default {
  components: {
    Sidebarfixed, Sidebaractive, Maintop, Mainbottom
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

.mainview {
  width: 100vw;
  background-color: pink;
}

div {
  vertical-align: top;
  border-right: 0;

}

.fix {
  width: $sidebarFixedWidth;
  display: inline-block;
  background-color: #007;
  height: $sidebarHeight;
}

.active {
  display: inline-block;
  width: $sidebarActiceWidth;
  background-color: #770;
  height: $sidebarHeight;
}

.main {
  display: inline-block;
  width: $mainWidth;
}

.top {
  display: block;
  background-color: blue;
  width: $mainWidth;
  height: $maintopHeight;

}

.bottom {
  display: block;
  background-color: green;
  width: $mainWidth;
  height: $mainbottomHeight;
}
</style>
