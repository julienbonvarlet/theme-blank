<template>
  <img class="f-img" :src="src" :alt="alt" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    alt?: string;
  }>(),
  {
    alt: "Faume",
  },
);
</script>

<style lang="scss">
.f-img {
  width: 100%;
  object-fit: cover;
  height: auto;
}
</style>
