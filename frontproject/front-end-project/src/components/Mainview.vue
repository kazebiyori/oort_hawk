<template>
  <router-view v-slot="{ Component }">

    <keep-alive>
      <component :is="Component" />
    </keep-alive>

  </router-view>

  {{ cacheTagsName }}
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      tags: state => state.tagbar.cacheTags
    }),
    ...mapGetters([
      'cacheTagsName'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

div {
  background-color: red;
  width: 100vw-$sidebarWidth;
  height: 30px;
  overflow: auto;
}
</style>
