export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.layout) {
    setPageLayout(to.meta.layout);
  }
});
