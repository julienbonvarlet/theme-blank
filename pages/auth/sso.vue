<template>
  <div class="sso">
    <FALoader size="m" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const authStore = useAuthStore();

const previousRoute = authStore.ssoPreviousRoute;

const redirect = () => {
  const routeName = previousRoute || "/";
  const location = routeName === "login" ? "account" : (routeName as string);
  navigateTo(location);
};

onMounted(() => {
  const provider = route.params.provider as "google" | "facebook";
  const clientId = route.params.client as string;

  authStore.getUserFromSSO(provider, clientId).finally(() => redirect());
});
</script>

<style lang="scss">
.sso {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--f-header-height) - var(--f-announcement-bar-height) - var(--f-top-bar-height));
}
</style>
