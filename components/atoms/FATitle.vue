<template>
  <component :is="tag" :class="['f-title', sizeClass]" v-bind="attrs">
    <slot>{{ title }}</slot>
  </component>
</template>

<script setup lang="ts">
import { TitleSizes, TitleTags } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    title?: string;
    size?: TitleSizes;
    tag?: TitleTags;
  }>(),
  {
    size: TitleSizes.M,
    tag: TitleTags.H2,
  },
);

const attrs = useAttrs();

const sizeClass = computed(() => `is-${props.size}`);
</script>

<style lang="scss">
.f-title {
  font-family: var(--f-font-family-title);

  @each $size in ("xl", "l", "m", "s", "xs") {
    &.is-#{$size} {
      font-weight: var(--f-title-#{$size}-font-weight);
      text-transform: var(--f-title-#{$size}-text-transform);
      letter-spacing: var(--f-title-#{$size}-letter-spacing);
      line-height: var(--f-title-#{$size}-line-height);
      font-size: var(--f-title-#{$size}-font-size);
    }
  }
}
</style>
