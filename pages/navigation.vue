<script setup lang="ts">
import { Navigation } from '~/types/index'
useHead({
    title: "Navigation - Hilary Liu"
})
const navgations: Navigation[] = [
    {
        name: "搜索引擎",
        navs: [
            {
                name: "百度",
                description: "中文搜索引擎",
                href: "http://www.baidu.com",
                icon: "uiw:baidu"
            },
            {
                name: "谷歌",
                description: "别墙掉的搜索引擎",
                href: "https://www.google.com/",
                icon: "uiw:chrome"
            }
        ]
    },
    {
        name: "在线教程",
        navs: [
            {
                name: "Electron",
                description: "electron 官方文档",
                href: "https://www.electronjs.org/",
                icon: "file-icons:electron"
            },
            {
                name: "Vite",
                description: "vite 官方文档",
                href: "https://vitejs.cn/",
                icon: "tabler:brand-vite"
            },
            {
                name: "Vue3",
                description: "vue3 官方文档",
                href: "https://vuejs.org/",
                icon: "tabler:brand-vue"
            },
            {
                name: "react",
                description: "react 官方文档",
                href: "https://react.docschina.org/",
                icon: "simple-icons:reactquery"
            },
            {
                name: "Nuxt",
                description: "Nuxt 官方文档",
                href: "https://nuxt.com/docs/getting-started/introduction",
                icon: "teenyicons:nuxtjs-outline"
            },
            {
                name: "Express",
                description: "Express 官方文档",
                href: "https://www.expressjs.com.cn/",
                icon: "devicon:express"
            }
        ]
    },
    {
        name: "在线工具",
        navs: [
            {
                name: "下载加速",
                description: "github下载加速",
                href: "https://github.ur1.fun/",
                icon: "mdi:github"
            },
            {
                name: "菜鸟工具",
                description: "菜鸟教程的工具集",
                href: "https://c.runoob.com/",
                icon: "ph:code"
            },
            {
                name: "Can I Use",
                description: "查看浏览器对JS的函数支持",
                href: "https://caniuse.com/?search=IntersectionObserver",
                icon: "material-symbols:question-mark-rounded"
            },
            {
                name: "React",
                description: "react 官方文档",
                href: "https://react.docschina.org/",
                icon: "simple-icons:reactquery"
            }
        ]
    }
]
</script>
<template>
    <div class="hl-navigation type-area pb-10" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center text-[2.25rem] font-bold">
            Navigation
            <div class="hl-navgation-item pt-6">
                <NavgationItem v-for="navigation in navgations" :key="navigation.name" :navgation-item="navigation" />
            </div>
        </div>
    </div>
</template>


