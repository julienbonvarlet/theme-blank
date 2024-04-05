<template>
  <component
    :is="tag"
    :to="to"
    class="f-button-icon"
    :class="[disabledClass]"
    :disabled="isDisabled"
    :type="typeAttrs"
  >
    <FALoader v-if="isLoading" />
    <FAIcon v-else :icon="icon" />
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import { IconNames } from "../../constants/ui-config";

const props = defineProps<{
  submit?: boolean;
  icon?: (typeof IconNames)[string];
  to?: string | object;
  isDisabled?: boolean;
  isLoading?: boolean;
}>();

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const disabledClass = computed(() => (props.isDisabled ? "is-disabled" : null));
const typeAttrs = computed(() => (props.submit ? "submit" : null));
const tag = computed(() => (props.to ? NuxtLink : "button"));
</script>

<style lang="scss">
.f-button-icon {
  width: var(--button-icon-width);
  height: var(--button-icon-width);
  border-radius: var(--button-icon-border-radius);
  border: var(--button-icon-border);
  background-color: var(--button-icon-background);
  transition: border ease 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--button-icon-color);

  @include hover {
    border: var(--button-icon-hover-border);
  }

  svg {
    width: var(--button-icon-svg-size);
    height: var(--button-icon-svg-size);
  }

  &[disabled="true"],
  &.is-disabled {
    pointer-events: none;

    svg {
      opacity: 0.3;
    }
  }
}
</style>
