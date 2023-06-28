<template>
  <NuxtLayout>
    <div class="canvas h-screen fixed pointer-events-none w-screen -z-50">
      <CanvasBackground></CanvasBackground>
    </div>
    <div class="absolute w-full top-20 z-40 left-0">
      <NuxtPage class=" min-h-screen" />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
import AOS from 'aos';
import "aos/dist/aos.css"; // You can also use <link> for styles

onMounted(() => {
  console.log("aos init");
  AOS.init()
})
</script>

<style lang="scss">
html {
  font-size: 20px;
}

body {
  overflow-x: hidden;

  ::selection {
    background-color: #8884;
  }
}
</style>

