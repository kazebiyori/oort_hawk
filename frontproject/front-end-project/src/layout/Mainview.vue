<template>

  <Sidebar class="sidebar"></Sidebar>

  <div :class="{ 'mainWithSide': showDataList, 'mainWithoutSide': !showDataList }">
    <Tagbar class="tagbar"></Tagbar>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>



</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { Sidebar, Tagbar } from './index.js'

export default {
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
  overflow: auto;
}

.mainWithoutSide {
  display: inline-block;
  transition: width $animationTime;

  width: $mainWithoutSideWidth;
  height: $sidebarHeight;
  overflow: auto;
}
</style>
