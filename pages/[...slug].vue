<script setup lang="ts">
const goBack = () => {
    useSelfRouter().goBack("/")
}
</script>
<template>
    <div class="404 mx-auto w-64">
        <p class=" text-center text-[1.5rem] text-gray-500 mt-8">404 Page Not Found</p>
        <p class=" text-center text-[0.8rem] text-purple-200">Sory, nothing could be found</p>
        <p class=" text-left mt-4">
            <span class=" font-mono">
                >
            </span>
            <span class="ml-1 font-cd cursor-pointer" @click="goBack">
                cd ~
            </span>
        </p>
    </div>
</template>
