<template>
  <NuxtLink class="f-header-link" :to="to">
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string;
  text?: string;
}>();
</script>

<style lang="scss">
.f-header-link {
  font-size: var(--f-header-link-font-size);
  text-transform: var(--f-header-link-text-transform);
  font-weight: var(--f-header-link-font-weight);
  letter-spacing: var(--f-header-link-letter-spacing);
  font-family: var(--f-header-link-font-family);
  text-decoration: var(--f-header-link-text-decoration);
  color: inherit;
  cursor: pointer;

  @include hover {
    text-decoration: var(--f-header-link-hover-text-decoration);
  }
}
</style>
