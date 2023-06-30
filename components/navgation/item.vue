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
        <div class="text-[1.25rem] font-bold opacity-50">
            {{ props.navgationItem.name }}
            <div class="hl-navs grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-max mx-auto">
                <a target="_blank" class="nav w-350 flex flex-row hl-navs-item p-2" v-for="i in props.navgationItem.navs"
                    :key="i.name" :href="i.href">
                    <div class="hl-nav-left w-10 opacity-50">
                        <Icon :name="i.icon!" class="h-full text-[1.25rem]"></Icon>
                    </div>
                    <div class="hl-nav-right text-[0.75rem] opacity-50 flex-1">
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

<style scoped lang="scss">
.hl-navs-item:hover {
    background-color: #e5e7eb;
    border-radius: 4px;
}

.hl-navs-item:hover .hl-nav-left {
    opacity: 1;
}

.hl-navs-item:hover .hl-nav-right {
    opacity: 1;
}
</style>
