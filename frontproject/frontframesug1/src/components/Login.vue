<template>
    <div class="div">
        <div class="demo-login">
            <div class="img">
                <img src="../SVG/dog.jpg" alt="#">
            </div>
            <div class="titletext">欢迎登录</div>
            <Login @on-submit="handleSubmit">
                <UserName name="username" />
                <Password name="password" />
                <div class="demo-auto-login">
                    <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
                    <a>忘记密码</a>
                </div>
                <Submit />
            </Login>
            <div class="asktext">还没有账户？</div>
            <div class="toeregister">立即注册</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            autoLogin: true
        }
    },
    methods: {
        handleSubmit(valid, { username, password }) {
            if (valid) {
                this.$Modal.info({
                    title: '输入的内容如下：',
                    content: 'username: ' + username + ' | password: ' + password
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';

.div {
    width: $mainWidth;
    height: $mainbottomHeight;

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
    height: 170px;
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
}
</style>
