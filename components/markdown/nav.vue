<script setup lang="ts">
defineOptions({
    name: "markdownNav",
})
const props = defineProps<{ links: any }>()
</script>
<template>
    <div class="hl-markdown-nav">
        <ul v-for="link in props.links" class="ml-2" :key="link.id">
            <a :href="`#${link.id}`" class=" overflow-hidden  block text-[0.75rem] hl-markdown-nav-a truncate h-5"
                :title="links.id">{{
                    link.id }}</a>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.hl-markdown-nav-a {
    transition: opacity 0.5s;
    padding: 4px;
}

.hl-markdown-nav-a:hover {
    opacity: 0.5;
    border-left: 1px solid red;
}
</style>

