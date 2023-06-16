
<script setup>
import BackGround from "./BackGround.vue";
import { onMounted, defineComponent } from "vue";
const COLORS = ["#FFB3B3", "#FFDBA4", "#FFE9AE", "#C1EFFF"];
onMounted(() => {
  // if (typeof window !== undefined) {
  //   console.log(window, "window");
  //   console.log(document, "document");
  //   var s_div = document.createElement("div"); // 创建节点
  //   s_div.setAttribute("id", "gitalk-container"); // 设置属性
  //   document.body.appendChild(s_div); // 添加节点
  //   var gitment = new Gitalk({
  //     id: location.pathname, // 可选。默认为 location.href
  //     owner: "Younglina",
  //     repo: "Younglina.github.io",
  //     clientID: "91a579be5a403288bdb7",
  //     admin: ["Younglina"],
  //     labels: ["Gitalk"],
  //     proxy: "https://cors-server-ecru.vercel.app/github_access_token",
  //     createIssueManually: true,
  //     clientSecret: "6af31ca2f5dfc7bc7feed23a8642d23993dcc9c3",
  //   });
  //   gitment.render("gitalk-container");
  // }
});
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