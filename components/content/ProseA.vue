<script setup lang="ts">
defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String,
        default: undefined,
        required: false
    }
})
</script>

<template>
    <a :href="href" :target="target"
        class=" transition-all duration-500 text-gray-700 no-underline border-b-2 border-gray-300 hover:border-gray-500">
        <slot />
    </a>
</template>