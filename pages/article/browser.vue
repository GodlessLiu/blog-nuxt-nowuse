<script setup lang="ts">
import { Aticle, ItemsGroup } from '~/types';

useHead({
    title: "Article - Hilary Liu"
})

interface YearFilter {
    [year: string]: boolean
}

const UseAticle = useAticle()
const itemsGroup = ref<ItemsGroup>({})
const yearFilter = reactive<YearFilter>({})
let YEARS: string[] = []


function modifyItemsGroup(items: Aticle[]) {
    const sortedItems = useSortBy(items, (o) => o.date)
    sortedItems.reverse()
    const iG = useGroupBy(sortedItems, '_dir')
    itemsGroup.value = iG
    return iG
}
const sortKeys = (keys: any[]) => {
    return keys.sort((a, b) => b - a)
}

function yearFilter2Array(item: YearFilter) {
    const yearArray: string[] = []
    for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
            const element = item[key]
            if (element) {
                yearArray.push(key)
            }
        }
    }
    return yearArray
}

const filterItemsByYear = async (item: YearFilter) => {
    const years = yearFilter2Array(item)
    const items = await UseAticle.findAticlesByYears(years)
    modifyItemsGroup(items)
}

onBeforeMount(async () => {
    const items = await UseAticle.getAllAticle()
    YEARS = Object.keys(modifyItemsGroup(items))
    YEARS.forEach((year) => {
        yearFilter[year] = true
    })
})

watch(yearFilter, (n, o) => {
    filterItemsByYear(n)
})

</script>

<template>
    <main class="hl-articles-browser overflow-y-auto" data-aos="fade-up" data-aos-duration="2000">
        <div class="type-area pb-10">
            <nav class="hl-articles-nav flex flex-row justify-center mt=10">
                <div v-for="year in sortKeys(YEARS)" :key="year" class="mr-4">
                    <input v-model="yearFilter[year]" type="checkbox" :id="year" name="year">
                    <label :for="year">{{ year }}</label>
                </div>
            </nav>
            <!-- 遍历每个year -->
            <div v-for="year in sortKeys(Object.keys(itemsGroup))" :key="year"
                class="hl-articles-year mt-32 min-h-fit mx-auto relative w-max">
                <div
                    class="absolute -z-50 text-9xl opacity-10 -top-12 md:-left-32 -left-4 font-bold text-transparent year select-none">
                    {{ year }}
                </div>
                <ArticleItem v-for="item in itemsGroup[year]" :item="item" :key="item._path"></ArticleItem>
            </div>
        </div>
    </main>
</template>
 
