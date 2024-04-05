<template>
  <button class="f-slider-button" :disabled="isDisabled">
    <FAIcon :icon="direction" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    direction?: "right" | "left";
    isDisabled?: boolean;
  }>(),
  {
    direction: "right",
  },
);
</script>

<style lang="scss">
.f-slider-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--slider-button-width);
  height: var(--slider-button-width);
  border: var(--slider-button-border);
  border-radius: var(--slider-button-border-radius);
  background-color: var(--slider-button-background);

  svg {
    width: var(--slider-button-icon-size);
    height: var(--slider-button-icon-size);
  }

  &[disabled="true"],
  &[disabled="disabled"] {
    pointer-events: none;
    opacity: 0;
  }
}
</style>
