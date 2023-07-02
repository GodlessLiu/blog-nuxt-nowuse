
<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
defineProps<{ id?: string }>()
const heading = 2
const { anchorLinks } = useRuntimeConfig().public.content
const generate = anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading)
</script>

<template>
  <h3 :id="id" class=" relative text-black opacity-70 mt-4">
    <slot />
  </h3>
</template>


