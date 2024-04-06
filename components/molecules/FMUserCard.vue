<template>
  <FMCardInline
    v-if="user"
    class="f-user-card"
    v-bind="userCardData"
    :has-background="true"
  >
    <template #right>
      <FAButton
        size="s"
        :label="$t('global.edit')"
        icon="write"
        type="secondary"
        @click.prevent="authStore.logout"
      />
    </template>
  </FMCardInline>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const userCardData = computed(() =>
  user.value
    ? {
        title: `${user.value.firstName} ${user.value.lastName}`,
        text: user.value.email,
      }
    : null
);
</script>

<style lang="scss">
.f-user-card {
  overflow-wrap: break-word;
  white-space: normal;
  word-break: break-word;

  button.f-button {
    margin: 0 0 0 auto;
    flex-shrink: 0;
  }
}
</style>
