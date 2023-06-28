<script setup lang="ts">
defineOptions({
    name: "markdownNav",
})
const props = defineProps<{ links: any }>()
</script>
<template>
    <div class="markdownNav">
        <ul v-for="link in props.links" class="ml-2" :key="link.id">
            <a :href="`#${link.id}`" class="font-nav">{{ link.id }}</a>
            <ul v-if="link.children" class="ml-4 break-words" v-for="i in link.children" :key="i.id">
                <a :href="`#${i.id}`" class="font-nav">{{ i.id }}</a>
                <markdownNav :links="i.children"></markdownNav>
            </ul>
        </ul>
    </div>
</template>


