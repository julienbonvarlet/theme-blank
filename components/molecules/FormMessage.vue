<template>
  <div :class="['f-form-message', typeClass]">
    <FAText size="s" :text="text">
      <slot />
    </FAText>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type?: "error" | "success";
  text?: string;
}>();

const typeClass = computed(() => (props.type ? `is-${props.type}` : ""));
</script>

<style lang="scss">
.f-form-message {
  padding: var(--form-message-padding-y) var(--form-message-padding-x);
  text-align: var(--form-message-text-align);
  background-color: var(--f-color-background-light);
  color: var(--f-color-text-dark);
  max-width: var(--fk-max-width-input);
  margin: 0 auto var(--f-length-2);

  &.is-error {
    background-color: var(--f-color-background-error);
    color: var(--f-color-text-error);
  }

  &.is-success {
    background-color: var(--f-color-background-success);
    color: var(--f-color-text-success);
  }
}
</style>
