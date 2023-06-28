<script setup lang="ts">
import { Nav } from '~/types/index'
const props = defineProps<{
    navgationItem: {
        name: string,
        navs?: Nav[]
    }
}>()
</script>
<template>
    <div class="pb-14">
        <div class="title text-[1.25rem] font-bold opacity-50">
            {{ props.navgationItem.name }}
            <div class="navs grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-max mx-auto">
                <a target="_blank" class="nav w-350 flex flex-row hover-item p-2" v-for="i in props.navgationItem.navs"
                    :key="i.name" :href="i.href">
                    <div class="nav-left w-10 opacity-50">
                        <Icon :name="i.icon!" class="h-full text-[1.25rem]"></Icon>
                    </div>
                    <div class="nav-right text-[0.75rem] opacity-50 flex-1">
                        <div class="text-left">
                            {{ i.name }}
                        </div>
                        <div class="text-left">
                            {{ i.description }}
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
