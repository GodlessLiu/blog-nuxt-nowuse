<script setup lang="ts">
const { setLocale, locale } = useI18n()

const isChinese = ref<boolean>(locale.value === "zh" ? true : false)
watch(isChinese, (n, o) => {
  if (n) {
    setLocale('zh')
  } else {
    setLocale("en-US")
  }
}, {
  immediate: false
})
const changeLanguage = () => {
  isChinese.value = !isChinese.value
}
</script>

<template>
  <div class="hl-lang-switch">
    <button @click="changeLanguage">
      <Icon :name="isChinese ? 'icon-park-outline:english' : 'icon-park-outline:chinese'" class="text-[1rem]"></Icon>
    </button>
  </div>
</template>
