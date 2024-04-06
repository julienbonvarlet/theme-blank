<template>
  <component :is="tag" v-if="title" class="f-card-title">
    <slot>{{ title }}</slot>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tag?: (typeof TagTypes)[string];
    title?: string;
  }>(),
  {
    tag: "h3",
  }
);
</script>

<style lang="scss">
.f-card-title {
  font-family: var(--card-title-font-family);
  font-weight: var(--card-title-font-weight);
  font-size: var(--card-title-sm-font-size);
  letter-spacing: var(--card-title-letter-spacing);

  @include media(">=tablet", "<desktop") {
    font-size: var(--card-title-md-font-size);
  }

  @include media(">=desktop") {
    font-size: var(--card-title-lg-font-size);
  }
}
</style>
