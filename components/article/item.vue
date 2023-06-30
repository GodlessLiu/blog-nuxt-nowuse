<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';

const props = defineProps<{
    item: ParsedContent
}>()
const router = useRouter()

const splitPath = (path: string) => {
    return path.split("/").splice(1).join("_")
}
const toPath = (_path: string) => {
    router.push({ name: "article-detail", query: { path: splitPath(_path) } })
}
</script>
<template>
    <div @click="toPath(props.item._path!)"
        class="hl-article cursor-pointer flex flex-row items-center xl:max-w-lg lg:max-w-md md:max-w-sm w-screen">
        <div class="hl-article-left opacity-50 ml-1 mr-6">
            <span class="text-[1rem] break-words">
                {{ props.item.title }}
            </span>
        </div>
        <div class="hl-article-right opacity-50 text-[0.75rem] min-w-max">
            <Icon :name="props.item.icon" class="mr-1 text-base" />
            <time class="font-extralight" :datetime="props.item.date">
                {{ props.item.date }}
            </time>
        </div>
    </div>
</template>


<style lang="scss" scoped>
/* 文章item hover效果 */
.hl-article {
    border-left: 4px solid transparent;
}

.hl-article:hover {
    border-color: #e5e7eb;
}

.hl-article:hover .hl-article-left {
    opacity: 1;
}

.hl-article:hover .hl-article-right {
    opacity: 1;
}
</style>
