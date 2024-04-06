<template>
  <FATitle class="f-ti-title" :class="`is-${size}`" :title="title" :tag="tag" :size="size" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    size: "s" | "m";
    tag?: TitleTags;
  }>(),
  {
    size: "m",
    tag: "h2",
  },
);
</script>

<style lang="scss">
.f-ti-title {
  &.is-s {
    margin-bottom: var(--f-length-3);
    padding-bottom: var(--f-length-1);
    border-bottom: solid 1px var(--f-color-border);
    text-align: left;

    @include media("<tablet") {
      margin-bottom: var(--f-length-2);
    }
  }
}
</style>
