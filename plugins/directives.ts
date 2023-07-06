import { useIntersectionObserver } from "@vueuse/core";
import defaultImage from "~/assets/default.jpg";

export default defineNuxtPlugin((app) => {
  app.vueApp.directive("lazyImg", {
    mounted(el, binding) {
      const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }], observerElement) => {
          if (isIntersecting) {
            el.onerror = function () {
              el.src = defaultImage;
            };
            el.src = binding.value;
            stop();
          }
        }
      );
    },
  });
});
