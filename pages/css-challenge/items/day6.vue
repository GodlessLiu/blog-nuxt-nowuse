<script lang="ts" setup>
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Filter Input",
});
onMounted(() => {
  const input: HTMLInputElement = document.querySelector("#input")!;
  var eleStyle = document.createElement("style");
  document.head.appendChild(eleStyle);
  // 文本框输入
  input.addEventListener("input", function () {
    var value = this.value.trim();
    // 这里匹配到不包含搜索的值进行隐藏，并且不区分大小写
    eleStyle.innerHTML = value
      ? '[data-search]:not([data-search*="' + value + '" i]) { display: none; }'
      : "";
  });
});
</script>
<template>
  <div class="day4">
    <main class="hl-main">
      <div class="hl-main-cotent">
        <div class="filter">
          <input type="search" id="input" placeholder="输入城市名称或拼音" />
          <ul>
            <li data-search="重庆市chongqing">重庆市</li>
            <li data-search="哈尔滨市haerbing">哈尔滨市</li>
            <li data-search="长春市changchun">长春市</li>
            <li data-search="成都chengdu">成都市</li>
            <li data-search="上海式shanghaishi">上海市</li>
            <li data-search="自贡zigongshi">自贡市</li>
            <li data-search="宜宾市yibinshi">宜宾市</li>
            <li data-search="雅安市yaanshi">雅安市</li>
            <li data-search="三亚市sanyashi">三亚市</li>
            <li data-search="桂林市guilinshi">桂林市</li>
          </ul>
        </div>
      </div>
    </main>
    <CssChallengeFooter
      :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day6.vue'"
      :date="'2022/7/7'"
    >
    </CssChallengeFooter>
  </div>
</template>

<style lang="css" scoped>
.filter {
  min-height: 400px;
}
</style>
