<template>
  <FMSectionContainer max-width="xl" :padding-y="true" :padding-x="true" class="ft-account" class-child="ft-account__container">
    <FOAccountMenu />
    <div class="ft-account__content" :class="`is-${name}`">
      <FALoader v-if="!user" size="l" />
      <slot v-else />
    </div>
  </FMSectionContainer>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const user = computed(() => userStore.user);

defineProps({
  name: {
    type: string,
    required: true,
  },
});

useAsyncData(
  "user-data",
  async () => {
    if (!user.value) {
      await userStore.fetchCurrentUser();
    }
  },
  { immediate: true },
);
</script>

<style lang="scss">
.ft-account {
  .f-account-menu {
    width: 20%;
    min-width: 250px;
    flex-shrink: 0;
  }

  &__container {
    display: flex;
    gap: var(--f-length-5);
  }

  &__content {
    flex-grow: 1;
    gap: var(--f-margin-page);
  }

  .f-form-message {
    margin-left: 0;
  }
}
</style>
