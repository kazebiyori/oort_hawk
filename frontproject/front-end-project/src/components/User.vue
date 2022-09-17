<template>
  <div class="avatar-wrapper">
    <div class="avatar">
    </div>

    <div class="box">
      <div class="user-info">
        <div class="user-name">用户名</div>
        <div class="user-status">
          <div>用户状态:</div>
          <div>上次登录时间:</div>
        </div>
      </div>
      <div class="theme-info">
        <div>更换主题</div>
        <div class="button-group">
          <button class="default" :class="{select: theme=='iview'}" @click="changeTheme('iview')"></button>
          <button class="light" :class="{select: theme=='light'}" @click="changeTheme('light')"></button>
          <button class="dark" :class="{select: theme=='dark'}" @click="changeTheme('dark')"></button>
        </div>
      </div>

      <!-- <div class="user-avatar">上传头像</div> -->

      <!-- <a href="#"><img src="icons/1.png" alt="" /><span>list</span></a>
      <a href="#"><img src="icons/2.png" alt="" /><span>Warehous</span></a>
      <a href="#"><img src="icons/3.png" alt="" /><span>theme</span></a>
      <a href="#"><img src="icons/4.png" alt="" /><span>wallet</span></a>
      <a href="#"><img src="icons/5.png" alt="" /><span>picture</span></a>
      <a href="#"><img src="icons/6.png" alt="" /><span>OR code</span></a>
      <a href="#"><img src="icons/7.png" alt="" /><span>authentication</span></a>
      <a href="#"><img src="icons/8.png" alt="" /><span>cancellation</span></a> -->
    </div>
  </div>

</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, watch } from 'vue'
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  setFetchMethod,
  enable,
  disable
} from 'darkreader';

const store = useStore();

let theme = ref(0)
function changeTheme(type) {
  localStorage.setItem('theme', type)
  theme.value = type
  if (type == 'dark') {
    store.commit('upDate', { themeType: 'iview' });
    window.document.documentElement.setAttribute("data-theme", 'iview');
    enable();
    return;
  }
  disable();
  store.commit('upDate', { themeType: type });
  window.document.documentElement.setAttribute("data-theme", type);
}

onMounted(() => {
  changeTheme(localStorage.getItem('theme'))
})

</script>


<style lang="scss">
.avatar-wrapper {
  position: relative;
  z-index: 1;
  user-select: none;
  overflow: visible;
}

.avatar {
  background-color: hsl(250, 50%, 50%);
  background: no-repeat center url('avatar.png');
  background-size: 70px;

  width: 100%;
  height: 100%;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  transition: 0.3s;

  cursor: pointer;

  z-index: 2;

}

.avatar-wrapper:hover {
  .avatar {
    transform: translateY(25px) scale(3);
    transition: 0.3s;
    transition-delay: 0.1s;
  }

  .box {
    height: 500px;
    // box-shadow: 0 0 2px 2px black;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .5);
  }
}

.box {
  width: 250px;
  height: 0;
  // background-color: #539ff5;
  background-color: #333333;
  border-radius: 10px;
  transition: 0.3s;
  transition-delay: 0.1s;

  position: absolute;

  transform: translateX(-45%);
  top: 60px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;

  font-size: medium;

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2px;
    margin-top: 40px;

    .user-name {
      margin: 0 auto;
      font-size: large;
      font-weight: bold;
    }

    .user-status {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: small;
    }
  }

  .theme-info {
    display: flex;
    justify-content: space-around;
    align-items: center;

    // border-bottom: 1px solid rgb(165, 173, 201);

    .button-group {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 30px;
    }

    button {
      font-size: medium;
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      height: small;
      background-color: hsl(250, 50%, 50%);
      transform: translateY(5%);
      padding: 3px;
      cursor: pointer;
    }

    .default {
      background-color: #FFFFFF;
    }

    .dark {
      background-color: black;
    }

    .light {
      background-color: #C0B5B5;
    }

    button:hover {
      transform: scale(1.1);
    }
  }

  .user-avatar {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.select {
  border: 2px solid cyan !important;
}
</style>