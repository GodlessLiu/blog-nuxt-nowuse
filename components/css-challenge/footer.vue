<script lang="ts" setup>
interface CssChallengeFooterProps {
  href?: string
  date?: Date | string
}
defineProps<CssChallengeFooterProps>()
</script>

<template>
  <div class="css-challenge-footer fixed bottom-0 h-10 leading-10 text-center w-full">
    <a :href="href" target="_blank" class="hover:opacity-50">
      <Icon name="mdi:github"></Icon>
    </a>
    <span class="text-xs float-right leading-10 mr-2 opacity-90 text-gray-400">
      {{ date }}
    </span>
  </div>
</template>

