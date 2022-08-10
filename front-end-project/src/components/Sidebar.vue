<template>
  <div :class="{ 'open': isOpened, 'close': !isOpened }">sidebar</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isOpened: state => state.app.sidebar.isOpened
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

div {
  background-color: antiquewhite;

}

.open {
  width: $sidebarWidth;
  transition: width 0.2s;
  height: 100vh;
  float: left;
  overflow: auto;
}

.close {
  width: 0;
  transition: width 0.2s;
  height: 100vh;
  float: left;
  overflow: auto;
}
</style>