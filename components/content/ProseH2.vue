
<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id?: string }>()
const heading = 2
const { anchorLinks } = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>

<template>
    <h2 :id="id" class=" relative text-black opacity-70 mt-4">
        <a v-if="id && generate" :href="`#${id}`"
            class="no-underline transition-all duration-500 opacity-0 absolute -left-4">
            #
        </a>
        <slot />
    </h2>
</template>

<style lang="scss" scoped>
h2:hover {
    a {
        opacity: 1;
    }
}
</style>
