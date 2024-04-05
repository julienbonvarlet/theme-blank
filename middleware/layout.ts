import { defineNuxtRouteMiddleware, setPageLayout } from "#app";

export default defineNuxtRouteMiddleware((from, to) => {
  if (to.meta.layout) {
    setPageLayout(to.meta.layout);
  }
});
