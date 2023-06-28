<script lang="ts">
import { defineComponent } from '#imports'

export default defineComponent({
    props: {
        code: {
            type: String,
            default: ''
        },
        language: {
            type: String,
            default: null
        },
        filename: {
            type: String,
            default: null
        },
        highlights: {
            type: Array as () => number[],
            default: () => []
        },
        meta: {
            type: String,
            default: null
        }
    }
})
</script>

<template>
    <div class="mt-1 mb-1 bg-[#f8f8f8] rounded-md relative code">
        <span class=" opacity-0 language absolute text-[0.25em] right-2 top-1 text-gray-400">{{ language }}</span>
        <slot />
    </div>
</template>

<style>
pre code .line {
    display: block;
    min-height: 1rem;
}

.code:hover .language {
    opacity: 1;
}
</style>