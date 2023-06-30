<script setup lang="ts">
const route = useRoute()
const path = route.query.path as string
const goBack = () => {
    useSelfRouter().goBack("/article/browser")
}
const unSplitePath = (path: string) => {
    return "/" + path.split("_").join("/")
}
</script>
<template>
    <div class="articleDetail">
        <ContentDoc :path="unSplitePath(path)" excerpt>
            <template #default="{ doc }">
                <!-- 文档navs -->
                <div
                    class="fixed pl-8 top-1/2 -translate-y-1/2 lg:block hidden max-h-96 overflow-y-auto scroll max-w-[15rem]">
                    <div class=" text-xs font-extralight">
                        导航栏
                    </div>
                    <nav v-for="i in doc.body.toc.links" :key="i.id" class="font-nav">
                        <a :href="`#${i.id}`">{{ i.text }}</a>
                        <MarkdownNav :links="i.children"></MarkdownNav>
                    </nav>
                </div>
                <article class="m-auto max-w-xl pl-4 pr-4">
                    <h1 class=" text-center text-3xl font-bold mb-8">{{ doc.title }}</h1>
                    <span class="opacity-50 text-xs">
                        <h3 class=" text-right text-xs opacity-50">—— {{ doc.description }}</h3>
                        <span class="mr-8">
                            Date <Icon name="mdi:clock-outline" class=" text-base"></Icon>: <time :datetime="doc.date">{{
                                useDayjs(doc.date) }}</time>
                        </span>
                        <span>
                            tag <Icon class="text-base" name="material-symbols:auto-label-outline-sharp"></Icon>: {{ doc.tag
                            }}
                        </span>
                    </span>
                    <div class=" border-b-2 mt-2"></div>
                    <!-- 渲染文档 -->
                    <div class="prose prose-sm max-w-full pb-8 prose-self text-xs" data-aos="fade-up"
                        data-aos-duration="2000">
                        <ContentRenderer :value="doc" />
                        <span class=" font-mono">
                            >
                        </span>
                        <span class="ml-1 font-cd cursor-pointer" @click="goBack">
                            cd . .
                        </span>
                    </div>
                </article>
            </template>
        </ContentDoc>
    </div>
</template>
