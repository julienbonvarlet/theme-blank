<template>
  <span class="f-checkbox" :class="[checkedClass, radioClass]">
    <FAIcon v-if="checked" :icon="IconNames.Check" />
  </span>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";

const props = defineProps<{
  checked?: Boolean;
  radio?: Boolean;
}>();

const checkedClass = computed(() => (props.checked ? "is-checked" : null));
const radioClass = computed(() => (props.radio ? "is-radio" : null));
</script>

<style lang="scss">
.f-checkbox {
  border: var(--input-border);
  width: var(--checkbox-width);
  height: var(--checkbox-width);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color ease 0.2s;
  background-color: var(--input-background-color);
  color: var(--input-color);
  flex-shrink: 0;

  @include hover {
    border-color: var(--input-hover-border-color);
  }

  .f-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transform: scale(0.8);

    svg {
      width: var(--checkbox-width);
      height: auto;
    }
  }

  &.is-radio {
    border-radius: 50%;

    .f-icon {
      background-color: var(--f-color-text-dark);
      color: var(--f-color-text-dark);
      border-radius: 50%;
      transform: scale(0.7);
    }
  }
}
</style>
