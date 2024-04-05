<template>
  <div class="f-account-heading" :class="sizeClass">
    <FABack v-if="backUrl" :to="backUrl" :text="backText" />
    <div class="f-account-heading__content">
      <FATitle tag="h2" :size="size">{{ title }}</FATitle>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "s" | "m";
    backUrl?: string;
    backText?: string;
    title: string;
  }>(),
  {
    size: "m",
  },
);

const sizeClass = computed(() => `is-${props.size}`);
</script>

<style lang="scss">
.f-account-heading {
  margin-bottom: var(--f-length-3);

  &.is-s {
    margin-bottom: var(--f-length-2);
  }

  .f-back {
    margin-bottom: var(--f-length-2);
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--f-length-2);
    padding-bottom: var(--f-length-2);
    border-bottom: solid 1px var(--f-color-border);

    .f-button {
      flex-shrink: 0;

      @include media("<tablet") {
        padding: 0;
        min-width: 35px; // accessibility minimum zone
        min-height: 35px; // square button

        &__text {
          display: none; // only icon
        }
      }
    }
  }
}
</style>
