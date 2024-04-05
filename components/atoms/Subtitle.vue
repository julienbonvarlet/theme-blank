<template>
  <component :is="tag" class="f-subtitle">
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { SubtitleTags } from "../../constants/ui-config";

const props = withDefaults(
  defineProps<{
    text?: string;
    tag?: (typeof SubtitleTags)[string];
  }>(),
  {
    tag: "h3",
  },
);
</script>

<style lang="scss">
.f-subtitle {
  font-family: var(--subtitle-font-family);
  font-weight: var(--subtitle-font-weight);
  line-height: var(--subtitle-line-height);
  text-transform: var(--subtitle-text-transform);
  letter-spacing: var(--subtitle-letter-spacing);
  font-size: var(--subtitle-sm-font-size);

  @include media(">=tablet", "<desktop") {
    font-size: var(--subtitle-md-font-size);
  }

  @include media(">=desktop") {
    font-size: var(--subtitle-lg-font-size);
  }
}
</style>
