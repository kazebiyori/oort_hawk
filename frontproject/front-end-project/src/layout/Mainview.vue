<template>

  <Sidebar class="sidebar"></Sidebar>

  <div :class="{ mainWithSide: isOpened, mainWithoutSide: !isOpened }">
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
      isOpened: state => state.app.sidebar.isOpened
    }),
    ...mapGetters([
      'cacheTagsName'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

.sidebar {
  display: inline-block;

}

.tagbar {
  height: $maintopHeight
}

.mainWithSide {
  display: inline-block;
  transition: width 0.2s;

  width: $mainWithSideWidth;
  height: $sidebarHeight;
  overflow: auto;
}

.mainWithoutSide {
  display: inline-block;
  transition: width 0.2s;

  width: $mainWithoutSideWidth;
  height: $sidebarHeight;
  overflow: auto;
}
</style>
