<script lang="ts" setup>
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Easy Scroll",
});
</script>

<template>
  <div class="day3">
    <main class="hl-main-self">
      <div class="img img1"></div>
      <div class="content">CONTENT1</div>
      <div class="img img2"></div>
      <div class="content">CONTENT2</div>
      <div class="img img3"></div>
      <div class="content">CONTENT3</div>
    </main>
    <CssChallengeFooter
      :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day3.vue'"
      :date="'2023/7/4'"
    >
    </CssChallengeFooter>
  </div>
</template>
<style lang="css" scoped>
.hl-main-self > div {
  height: 100vh;
}
.img {
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
}
.img1 {
  background-image: url(/css-challenge/1.jpg);
}
.img2 {
  background-image: url(/css-challenge/2.jpg);
}
.img3 {
  background-image: url(/css-challenge/3.jpg);
}
.content {
  line-height: 100vh;
  text-align: center;
  font-size: 48px;
}
</style>
