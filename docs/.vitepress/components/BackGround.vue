<template>
  <div class="container">
    <video preload="auto" loop muted autoplay class="bg-vid" id="bg_vid">
      <source
        src="/video/pexels-fernando-sánchez-aranguren.mp4"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.bg-vid {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background-size: cover;
}
</style>