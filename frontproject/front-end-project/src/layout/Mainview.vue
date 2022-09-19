<template>
  <div class="wrapper">
    <Sidebar class="sidebar"></Sidebar>

    <div :class="{ 'mainWithSide': showDataList, 'mainWithoutSide': !showDataList }">
      <Tagbar class="tagbar"></Tagbar>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { Sidebar, Tagbar } from './index.js'

export default {
  methods: {
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

.wrapper {
  display: flex;
}

.sidebar {}

.tagbar {
  height: $maintopHeight
}

.mainWithSide {
  // transition: width $animationTime;
  width: $mainWithSideWidth;
  height: $sidebarHeight;
  // overflow: hidden;
}

.mainWithoutSide {
  width: $mainWithoutSideWidth;
  height: $sidebarHeight;
}
</style>
