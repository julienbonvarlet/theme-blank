<template>
  <NuxtLink :to="url" class="f-account-link">
    <FAIcon v-if="icon && displayIcon" :icon="icon" />
    <span>{{ title }}</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { IconNames } from "~/types/enums";

defineProps<{
  title: {
    type: String;
    required: true;
  };
  url: {
    type: String;
    required: false;
  };
  icon: {
    type: IconNames;
    required: false;
  };
  displayIcon: {
    type: boolean;
    required: false;
    default: true;
  };
}>();
</script>

<style lang="scss">
.f-account-link {
  padding: var(--account-menu-link-padding-y) var(--account-menu-link-padding-x);
  display: flex;
  align-items: center;
  gap: var(--account-menu-link-gap);
  font-size: var(--account-menu-link-font-size);
  font-family: var(--account-menu-link-font-family);
  font-weight: var(--account-menu-link-font-weight);
  letter-spacing: var(--account-menu-link-letter-spacing);
  text-transform: var(--account-menu-link-text-transform);

  &:hover {
    background-color: var(--account-menu-link-hover-background);
  }

  .f-icon {
    font-size: var(--account-menu-link-icon-size);
  }
}
</style>
