<script setup lang="ts">
const goBack = () => {
  useSelfRouter().goBack("/css-challenge");
};
</script>

<template>
  <div>
    <div class="pl-2 h-10 leading-10 fixed top-0">
      <Icon
        class="opacity-90 hover:opacity-50 font-bold text-gray-400 cursor-pointer text-xl"
        name="ic:round-less-than"
        @click="goBack"
      >
      </Icon>
    </div>
    <slot />
  </div>
</template>
