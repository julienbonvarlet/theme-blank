<template>
  <div class="sso">
    <FALoader size="m" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const previousRoute = computed(() => authStore.ssoPreviousRoute);

const redirect = () => {
  const routeName = previousRoute.value;
  router.push({
    name: routeName === "login" ? "account" : routeName,
  });
};

onMounted(() => {
  const provider = route.params.provider;
  const clientId = route.params.client;

  authStore.getUserFromSSO(provider, clientId).finally(() => redirect());
});
</script>

<style lang="scss">
.sso {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(
    100vh - var(--f-header-height) - var(--f-announcement-bar-height) - var(
        --f-top-bar-height
      )
  );
}
</style>
