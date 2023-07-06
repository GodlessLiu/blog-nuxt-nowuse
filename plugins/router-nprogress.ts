import NProgress from "nprogress";
import "~/assets/css/nprogress.css";
export default defineNuxtPlugin((app) => {
  app.$router.beforeEach((to: any, from: any, next: any) => {
    NProgress.start();
    next();
  });
  app.$router.afterEach(() => {
    NProgress.done();
  });
});
