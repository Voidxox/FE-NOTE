<template>
  <div>
    <span class="color-ccc">瀑布流</span>
    <WaterFallList :options="options" @cardClick="cardClick"></WaterFallList>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import WaterFallList from "../.vitepress/components/WaterfallList/index.vue";
const options = reactive({
  // 唯一key值
  rowKey: "id",
  // 卡片之间的间隙
  gutter: 10,
  // 是否有周围的gutter
  hasAroundGutter: true,
  // 卡片在PC上的宽度
  width: 320,
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2,
    },
  },
  // 动画效果
  animationEffect: "animate__fadeInUp",
  // 动画时间
  animationDuration: 1000,
  // 动画延迟
  animationDelay: 300,
  // 背景色
  backgroundColor: "#ccc",
  // imgSelector
  imgSelector: "src",
  // 加载配置
  // loadProps: {
  //   loading,
  //   error,
  // },
  // 是否懒加载
  lazyload: true,
});
function cardClick(e) {
  console.log(e, "e");
}
</script>

<style lang="scss" scoped>
</style>