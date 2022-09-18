<template>
  <button class="neumorphism">
    <slot class="content"></slot>
  </button>


</template>

<script setup>


</script>

<style>
.neumorphism {
  display: flex;
  justify-content: center;
  align-items: center;

  /* cursor: pointer; */

  /* padding: 4px; */
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 5px;
  background-color: whitesmoke;
  box-shadow: 1px 1px 3px #bbbbbb, -1px -1px 3px #ffffff;
}

.neumorphism:active {
  box-shadow: inset 1px 1px 3px #bbbbbb, inset -1px -1px 3px #ffffff;
}

.neumorphism:focus {
  outline: none;
}

.neumorphism svg {
  user-select: none;
  transition: 0.1s;
  color: #8c8c8c;
}

.neumorphism:active svg {
  transform: scale(0.95);
}
</style>