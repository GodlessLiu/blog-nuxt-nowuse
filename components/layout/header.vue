<template>
    <div class="header h-10 flex z-50 absolute w-full flex-row justify-between pl-6 pr-4">
        <a href="/">
            <Icon name="ph:book-open-text-thin" class="text-[2.25rem] logo float-left pt-2 fixed "></Icon>
        </a>
        <div class="header-navs h-10 text-[0.75rem] leading-10">
            <LayoutLanguage class=" inline-block mr-4"></LayoutLanguage>
            <NuxtLink to="/navigation" class="link">{{ $t("navigations") }}</NuxtLink>
            <NuxtLink to="/article/browser" class="link">{{ $t("articles") }}</NuxtLink>
            <a href="http://43.136.131.248:81" target="_blank">books</a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.link {
    padding: 0 8px 2px 4px;
    transition: border-bottom .5s;

    &:hover {
        color: rgb(75, 85, 99);
        border-bottom: 2px solid rgb(75, 85, 99);
    }
}

.router-link-active {
    --tw-text-opacity: 1;
    color: rgb(75 85 99 / var(--tw-text-opacity));
    border-bottom: 2px solid rgb(75 85 99 / var(--tw-text-opacity));
}
</style>
