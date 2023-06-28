
<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h3 :id="id" class=" relative text-black opacity-70 mt-4">
    <slot />
  </h3>
</template>


