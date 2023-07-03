<script lang="ts" setup>
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Fill Blanks"
})
</script>
<template>
  <main class="hl-main">
    <div class="hl-main-cotent">
      <ul class="info">
        <li>姓名：<span class="info-item-fill">Hilary Liu</span></li>
        <li>年龄：<span class="info-item-fill">21</span></li>
        <li>生日：<span class="info-item-fill">2001/10/18</span></li>
        <li>学号：<span class="info-item-fill"></span></li>
        <li>性别：<span class="info-item-fill">男</span></li>
        <li>学校：<span class="info-item-fill"></span></li>
        <li>班级：<span class="info-item-fill"></span></li>
      </ul>
    </div>
  </main>
  <CssChallengeFooter :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day2.vue'" :date="'2023/7/3'">
  </CssChallengeFooter>
</template>

<style lang="css" scoped>
.info-item-fill:empty::before {
  content: "暂无";
  color: gray;
}
</style>
