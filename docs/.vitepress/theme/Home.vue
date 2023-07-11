
<script setup>
import BackGround from "./components/BackGround.vue";
import { onMounted, defineComponent } from "vue";
const COLORS = ["#FFB3B3", "#FFDBA4", "#FFE9AE", "#C1EFFF"];
onMounted(() => {});
</script>
<template>
  <div class="home-page">
    <BackGround></BackGround>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>