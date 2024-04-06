<template>
  <NuxtLink :to="to" class="f-account-overview-block" :class="[colorClass]">
    <FAButtonIcon :icon="icon" />
    <FAText>{{ text }}</FAText>
    <FATitle size="m">{{ title }}</FATitle>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: IconNames;
  to: string | object;
  title: string;
  text: string;
  color: "dark" | "light";
}>();

const colorClass = computed(() => `is-${props.color || "dark"}`);
</script>

<style lang="scss">
.f-account-overview-block {
  padding: var(--f-length-4);
  display: flex;
  flex-direction: column;
  gap: var(--f-length-1);

  & > *:first-child {
    margin-bottom: var(--f-length-3);
  }

  &.is-light {
    background-color: var(--f-color-background-light);
  }

  &.is-dark {
    background-color: var(--f-color-background-dark);
    color: var(--f-color-text-light);
  }
}
</style>
