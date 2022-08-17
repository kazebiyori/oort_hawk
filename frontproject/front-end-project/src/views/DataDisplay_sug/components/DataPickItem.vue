<template>
  <div style="height:40px; text-align=center">
    <el-color-picker v-model="color" />

    <Select v-model="model" style="width:80px" placeholder="数据A">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <Select v-model="model" style="width:80px" placeholder="数据A">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <el-icon class="icon" :size="iconSize">
      <Delete />
    </el-icon>

    <el-icon class="icon" :size="iconSize" sytel="display:inline-block;margin:10px">
      <component :is="iconName" @click="handleFoldClick"></component>
    </el-icon>


  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue';

let color = ref('#000')
let iconName = "hide"
let iconSize = 20


</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
</style>
