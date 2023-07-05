<template>
  <NuxtLayout>
    <NuxtPage class="min-h-screen pt-10" />
  </NuxtLayout>
</template>
<script setup lang="ts">
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

onMounted(() => {
  console.log("aos init");
  AOS.init();
});
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

.hl-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

.hl-main-content {
  display: inline-block;
  width: 500px;
}
</style>
