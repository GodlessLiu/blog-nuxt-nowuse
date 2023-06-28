export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath === "/article/write") {
        console.log(1);
    }
})