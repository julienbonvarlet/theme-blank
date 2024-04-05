<template>
  <component
    :is="tag"
    class="f-text"
    :class="[sizeClass, weightClass, greyClass]"
    v-bind="attrs"
  >
    <span v-if="text" v-html="text" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TextSizes, TextTags, TextWeights } from "../../constants/ui-config";

const props = withDefaults(
  defineProps<{
    text?: string;
    size?: (typeof TextSizes)[string];
    weight?: (typeof TextWeights)[string];
    tag?: (typeof TextTags)[string];
    isGrey?: boolean;
  }>(),
  {
    size: "m",
    weight: "regular",
    tag: "p",
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
