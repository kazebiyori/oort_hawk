<template>
  <div class="wrapper">
    <h1>飞参数据处理系统登录</h1>
    <div class="inputBox">
      <input type="text" required="required">
      <span>用户名</span>
      <i></i>
    </div>
    <div class="inputBox">
      <input type="password" required="required">
      <span>密码</span>
      <i></i>
    </div>
    <div class="functionBox">
      <div>
        <input id="checkbox" type="checkbox">
        <label for="checkbox">自动登录</label>
      </div>
      <div>
        <a href="#">注册</a>
      </div>
    </div>
    <div class="btn">
      <button>登录</button>
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
h1 {
  color: #E4E1DB;
  background-color: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
  animation: animate 2s linear infinite;
}

.btn button {
  cursor: pointer;
  border: none;
  width: 250px;
  height: 35px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  font-weight: bolder;
  font-size: medium;
  letter-spacing: 0.1em;


  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    outline: 3px solid rgba(255, 255, 255, 0.3);
    transition: 100ms;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.9);
  }
}


.functionBox {
  color: #E4E1DB;
  display: flex;
  justify-content: space-between;
  width: 250px;
}

.functionBox input {
  position: relative;
  top: 2px;
  margin-right: 2px;
  cursor: pointer;
}

.functionBox label {
  color: rgba(255, 255, 255, 0.5);

  position: relative;
  vertical-align: top;
  transition: color 0.3s;
  cursor: pointer;
  font-weight: normal;
}

.functionBox a {
  color: rgba(255, 255, 255, 0.5);
}

.functionBox a:hover {
  color: rgba(255, 255, 255, 0.7);
}

.functionBox a:active {
  color: rgba(255, 255, 255, 0.9);
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 30px;
  background: #222;
}

.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  background: transparent;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 1em;
  letter-spacing: 0.1em;
  padding: 10px 0 5px;
}

.inputBox span {
  position: absolute;
  left: 0;
  padding: 6px 0 5px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  pointer-events: none;
  letter-spacing: 0.1em;
  transition: 0.5s;
  //font-size: 1rem;

}

.inputBox input:valid~span,
.inputBox input:focus~span {
  color: #2196f3;
  transform: translateY(-16px);
  font-size: 0.65em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  overflow: hidden;
}

.inputBox i::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
  animation: animate 2s linear infinite;
  transition: 0.5s;
}

.inputBox input:valid~i::before,
.inputBox input:focus~i::before {
  left: 0;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: 250px;
  }
}
</style>
