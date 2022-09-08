<template>
  <Sidebar class="sidebar"></Sidebar>

  <div :class="{ 'mainWithSide': showDataList, 'mainWithoutSide': !showDataList }">
    <Tagbar class="tagbar"></Tagbar>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

<div  class="thememanu">
    <button @click="theme('iview')">默认</button>
    <button @click="theme('light')">浅色</button>
    <button @click="theme('dark')">深色</button>
</div>


  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { Sidebar, Tagbar } from './index.js'

export default {
  methods:{
    theme(type) {
    this.$store.commit('upDate', {themeType: type});
    window.document.documentElement.setAttribute( "data-theme", type );
}
  },
  components: {
    Sidebar, Tagbar
  },
  computed: {
    ...mapState({
      tags: state => state.tagbar.cacheTags,
      showDataList: state => state.app.sidebar.showDataList
    }),
    ...mapGetters([
      'cacheTagsName'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import "@/styles/_handle.scss";
    div {
        // font-size: 18px;
        @include font_color("font_color1");
        @include background_color("background_color1");
        @include border_color("border_color1");
    }
.thememanu{
  z-index: 200px;
  position: absolute;
  top: 10px;
  right: 300px;
}
.sidebar {
  display: inline-block;
}

.tagbar {
  height: $maintopHeight
}

.mainWithSide {
  display: inline-block;
  transition: width $animationTime;

  width: $mainWithSideWidth;
  height: $sidebarHeight;
  overflow: hidden;
}

.mainWithoutSide {
  display: inline-block;
  transition: width $animationTime;

  width: $mainWithoutSideWidth;
  height: $sidebarHeight;
  overflow: hidden;
}
</style>
