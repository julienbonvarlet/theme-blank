<template>
  <component :is="tag" class="f-text" :class="[sizeClass, weightClass, greyClass]" v-bind="attrs">
    <span v-if="text" v-html="text" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { TextSizes, TextTags, TextWeights } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    text?: string;
    size?: TextSizes;
    weight?: TextWeights;
    tag?: TextTags;
    isGrey?: boolean;
  }>(),
  {
    size: TextSizes.M,
    weight: TextWeights.REGULAR,
    tag: TextTags.P,
  },
);

const attrs = useAttrs();
const sizeClass = computed(() => `is-${props.size}`);
const weightClass = computed(() => `is-${props.weight}`);
const greyClass = computed(() => (props.isGrey ? "is-grey" : ""));
</script>

<style lang="scss">
.f-text {
  font-family: var(--f-font-family-text);
  line-height: var(--f-text-letter-spacing);
  font-weight: 400;

  &.is-xs {
    font-size: var(--f-text-xs-font-size);
  }
  &.is-s {
    font-size: var(--f-text-s-font-size);
  }
  &.is-m {
    font-size: var(--f-text-m-font-size);
  }

  &.is-bold {
    font-weight: 800;
  }

  &.is-light {
    font-weight: 200;
  }

  &.is-grey {
    color: var(--f-color-text-grey);
  }
}
</style>
