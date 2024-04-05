// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated()) {
    return navigateTo("/login");
  }
});
