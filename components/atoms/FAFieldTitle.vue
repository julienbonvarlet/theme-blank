<template>
  <component :is="tag" class="f-field-title">
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    tag?: "label" | "p" | "span";
  }>(),
  {
    tag: "label",
  },
);
</script>

<style lang="scss">
.f-field-title {
  font-family: var(--f-field-title-font-family);
  font-size: var(--f-field-title-font-size);
  font-weight: var(--f-field-title-font-weight);
  text-transform: var(--f-field-title-text-transform);
  letter-spacing: var(--f-field-title-letter-spacing);
  color: var(--f-field-title-color);
}
</style>
