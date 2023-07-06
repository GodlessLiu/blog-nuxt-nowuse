<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core";
import { mock } from "node:test";
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Waterfall Flow",
});
const hook = ref<HTMLDivElement>();
// TODO:添加图片懒加载
const images = ref([
  "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1574843/pexels-photo-1574843.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3265456/pexels-photo-3265456.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1553963/pexels-photo-1553963.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1647972/pexels-photo-1647972.jpeg?auto=compress&cs=tinysrgb&w=600",
]);
const Mockimg = [
  "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/59106/pexels-photo-59106.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1428787/pexels-photo-1428787.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/42148/pexels-photo-42148.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1840101/pexels-photo-1840101.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/795188/pexels-photo-795188.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=600",
];

function mockApi(page: number, size: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = images.value.push(
        ...Mockimg.slice(page * size, page * size + size)
      );
      resolve(total);
    }, 500);
  });
}
const loadingShow = ref(true);
const loading = ref<boolean>(false);
let page = 0;
let size = 6;
const total = 18;

const Load = (fn: Function) => {
  mockApi(page, size).then((num) => {
    fn();
    if (num === total) {
      loadingShow.value = false;
      stop();
    }
    page++;
  });
};

const { stop } = useIntersectionObserver(
  hook,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting && !loading.value) {
      loading.value = true;
      Load(() => (loading.value = false));
    }
  }
);
</script>
<template>
  <div class="day5">
    <main class="hl-main">
      <div class="waterfall-flow w-full h-full">
        <div class="main">
          <div class="box" v-for="i in images" :key="i">
            <img :src="i" />
          </div>
        </div>
        <div class="end text-center" ref="hook" v-if="loadingShow">
          loading...
        </div>
        <div class="end text-center" ref="hook" v-else>到底了</div>
      </div>
    </main>
    <CssChallengeFooter
      :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day5.vue'"
      :date="'2023/7/6'"
    >
    </CssChallengeFooter>
  </div>
</template>

<style lang="css" scoped>
.main {
  padding: 10px;
  columns: 4;
  -webkit-columns: 4; /* Safari and Chrome */
  -moz-columns: 4; /* Firefox */
  column-gap: 10px;
}
.box {
  box-shadow: 1px 1px 9px #ccc;
  margin-bottom: 8px;
}
@media screen and (max-width: 1400px) {
  .main {
    columns: 3;
    -webkit-columns: 3;
    -moz-columns: 3;
  }
}
@media screen and (max-width: 780px) {
  .main {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
}
@media screen and (max-width: 390px) {
  .main {
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
  }
}
</style>
