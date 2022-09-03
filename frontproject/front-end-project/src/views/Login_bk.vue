<template>
  <div class="div">
    <div class="demo-login">
      <div class="img">
        <img src="../assets/img/小狗.jpg" alt="#">
      </div>
      <div class="titletext">欢迎登录</div>
      <Login @on-submit="handleSubmit">
        <UserName name="username" enter-to-submit />
        <Password name="password" enter-to-submit />
        <div class="demo-auto-login">
          <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
          <a>忘记密码</a>
        </div>
        <Submit />
      </Login>
      <div class="asktext">还没有账户？</div>
      <div class="toeregister" @click="$router.push('/register')">立即注册</div>
    </div>
  </div>
</template>
<script>
import userAPI from '@/api/user.js'
export default {
  data() {
    return {
      autoLogin: true
    }
  },
  methods: {
    // root+1234
    handleSubmit(valid, { username, password }) {
      this.$router.push('/datadisplay')

      if (valid) {
        userAPI.login({ userName: username, userPassword: password })
          .then((data) => {
            this.$router.push('/datadisplay')
          })
          .catch((err) => {
            this.$Message.info(err.msg || err);
            // ElMessage(err.msg || err)
          })
      } else {
        this.$Message.info('请输入格式正确的用户名和密码');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.div {
  width: 100%;
  height: 100%;

  padding-top: 50px;
  background-color: aliceblue;
}

.demo-login {
  width: 400px;
  margin: 0 auto !important;
}


.demo-auto-login {
  margin-bottom: 24px;
  text-align: left;
}

.demo-auto-login a {
  float: right;
}

img {
  width: 400px;
}

.titletext {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.asktext {
  margin-top: 40px;
  font-size: 20px;
  text-align: center;
  color: black;
}

.toeregister {
  margin-top: 5px;
  font-size: 20px;
  text-align: center;
  color: rgb(49, 108, 218);

  &:hover {
    cursor: pointer;
  }
}
</style>
