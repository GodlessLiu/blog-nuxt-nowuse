<script setup lang="ts">
const dirs = ref<any>([])
const files = ref<any>([])
const activeKey = ref<number>(0)

const BASE_URL = import.meta.env.VITE_BOOKS_URL
const activeDir = ref<string>('')
const loading = ref<boolean>(false)

function useFetch(url: string, ref: Ref, first: boolean = false) {
  if (!first) loading.value = true
  activeDir.value = url
  $fetch(url).then(res => {
    ref.value = res
    if (!first) loading.value = false
  })
}

function useMb(byte: number) {
  return Math.round(byte / 1024 / 1024 * 100) / 100 + 'Mb'
}

// 初始化文件夹
useFetch(BASE_URL, dirs, true)
// 获得files
useFetch(BASE_URL + "JavaScript", files)

// 点击文件夹改变
const changeFiles = async (dir: any, index: number) => {
  activeKey.value = index
  useFetch(BASE_URL + dir.name, files)
}
</script>

<template>
  <div class="hl-books type-area">
    <div class="mx-auto w-1/2 min-w-[24rem] bg-white opacity-70 ">
      <div class="hl-books-header">
        <p class=" font-bold text-2xl">
          Books
        </p>
        <p class="text-xs italic mb-4">
          Here are some books about the front end
        </p>
      </div>
      <div class="hl-books-body flex flex-row shadow-md border-t-[1px] pr-2">
        <div class="hl-body-left w-20  box-content border-r-2 p-2">
          <div v-for="dir, index in  dirs " :key="dir.name" @click="changeFiles(dir, index)"
            :class="[activeKey === index ? 'dir_clicked' : '', 'text-sm', ' text-gray-700', 'opacity-60', 'cursor-pointer']">
            {{ dir.name }}
          </div>
        </div>
        <div class="hl-body-right flex-1 pt-4 pl-2">
          <span v-show="loading">
            <Icon class="text-3xl" name="eos-icons:bubble-loading"></Icon>
          </span>
          <ul class=" text-xs" v-show="!loading">
            <li v-for="file in files" :key="file.name">
              <a :href="activeDir + '/' + file.name" :download="file.name" class="block mb-1 hover:opacity-50">
                {{ file.name }}
                <span class=" float-right">
                  <span class=" text-[0.75rem] mr-2">
                    {{ useMb(file.size) }}
                  </span>
                  <span class=" text-[0.5rem]">
                    {{ useDayjs(file.mtime) }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.dir_clicked {
  opacity: 1;
}
</style>
