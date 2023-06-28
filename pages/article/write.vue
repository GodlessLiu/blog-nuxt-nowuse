<template>
    <div @click="wr">write</div>
</template>

<script setup lang="ts">
const wr = () => {
    $fetch("/api/v1/aticles/aticle", {
        method: "POST"
    })
}
</script>

