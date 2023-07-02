<script setup lang="ts">

useHead({
  title: "Hilary Liu - Css Chanlenge"
})
// 每四个一组
const data = [
  // day1-4
  [
    { name: "Load More", href: "/css-challenge/items/day1" }
  ],
  // day5-8
  []
]
function useIndexToDay(index: number) {
  return index < 10 ? "00" + index : "0" + index
}

</script>

<template>
  <div class="hl-css-chanlenge type-area">
    <main class="mx-auto w-max">
      <div class="hl-css-chanlenge-hearder">
        <p class="font-bold text-2xl mb-1 opacity-70">
          Css Chanlenge
        </p>
        <summary class="text-xs italic mb-4 opacity-70">
          Use CSS to accomplish the effect of JavaScript
        </summary>
      </div>
      <table>
        <tbody>
          <tr v-for="item in data">
            <td class="hl-main-td" v-for="i, index in item" :key="i.name">
              <a :href="i.href" class="hl-main-td-a">
                <span class="font-mono mr-1 opacity-40">{{ useIndexToDay(index + 1) }}</span>
                <span class="text-[0.75rem] opacity-60">{{ i.name }}</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.hl-main-td-a:hover {
  span:first-child {
    opacity: .6;
  }

  span:nth-child(2) {
    opacity: 1;
  }
}
</style>
