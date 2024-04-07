<template>
  <div class="f-section-container" :class="[marginYClass, marginXClass]">
    <div class="f-section-container__inner" :class="[maxWidthClass, paddingXClass, paddingYClass, classChild]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  marginY?: boolean;
  marginX?: boolean;
  paddingX?: boolean;
  paddingY?: boolean;
  maxWidth?: WrapperWidths;
  classChild?: string;
}>();

const marginXClass = computed(() => (props.marginX ? "is-margin-x" : null));
const marginYClass = computed(() => (props.marginY ? "is-margin-y" : null));
const paddingXClass = computed(() => (props.paddingX ? "is-padding-x" : null));
const paddingYClass = computed(() => (props.paddingY ? "is-padding-y" : null));
const maxWidthClass = computed(() => (props.maxWidth ? `is-${props.maxWidth}` : null));
</script>

<style lang="scss">
.f-section-container {
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    width: 100%;
    margin: 0 auto;

    @each $size in ("xl", "l", "m", "s") {
      &.is-#{$size} {
        max-width: var(--max-width-#{$size});
      }
    }

    &.is-padding-x {
      padding-right: var(--f-margin-page);
      padding-left: var(--f-margin-page);
    }

    &.is-padding-y {
      padding-top: var(--f-margin-section);
      padding-bottom: var(--f-margin-section);
    }
  }

  &.is-margin-x {
    margin-right: var(--f-margin-page);
    margin-left: var(--f-margin-page);
  }

  &.is-margin-y {
    margin-top: var(--f-margin-section);
    margin-bottom: var(--f-margin-section);
  }
}
</style>
