<template>
  <NuxtLink :to="url" class="f-account-link">
    <FAIcon v-if="icon && displayIcon" :icon="icon" />
    <span>{{ title }}</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { IconNames } from "../../constants/ui-config";

const props = withDefaults(
  defineProps<{
    title: string;
    url?: string;
    icon?: (typeof IconNames)[string];
    displayIcon?: boolean;
  }>(),
  {
    displayIcon: true,
  },
);
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
