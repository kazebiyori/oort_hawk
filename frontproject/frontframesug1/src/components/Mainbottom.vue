<template>
    <div class="login">
        <Login></Login>
    </div>

    <!-- <Register></Register> -->
    <!-- Register的内容只有 放在Login里面才能正常显示？？？？？？-->

</template>

<script>
import { Login, Register } from '@/components/index.js'

export default {
    components: {
        Login,
        Register,
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/a-my-variables.scss';
</style>
