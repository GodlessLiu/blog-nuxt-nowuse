<script setup lang="ts">
const dirs = ref<any>([])
const files = ref<any>([])
const activeKey = ref<number>(0)

const BASE_URL = "http://43.136.131.248:81/"

const activeDir = ref<string>('')

function useFetch(url: string, ref: Ref) {
  activeDir.value = url
  $fetch(url).then(res => {
    ref.value = res
  })
}
// 初始化文件夹
useFetch(BASE_URL, dirs)
// 获得files
useFetch(BASE_URL + "JavaScript", files)

// 点击文件夹改变
const changeFiles = async (dir: any, index: number) => {
  activeKey.value = index
  useFetch(BASE_URL + dir.name, files)
}
</script>

<template>
  <div class="books type-area">
    <div class="main mx-auto w-full flex flex-row bg-red-300">
      <div class="main-left w-20 p-2 box-content border-r-2">
        <div v-for="dir, index in  dirs " :key="dir.name" @click="changeFiles(dir, index)"
          :class="[activeKey === index ? 'text-blue-100' : '', 'text-sm']">
          {{ dir.name }}
        </div>
      </div>
      <div class="main-right flex-1 pt-4 pl-1">
        <ul class=" text-xs">
          <li v-for="file in files" :key="file.name">
            <a :href="activeDir + '/' + file.name" :download="file.name">
              {{ file.name }}
              {{ useDayjs(file.mtime) }}
              {{ file.size }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
