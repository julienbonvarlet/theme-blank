<template>
  <NuxtLink :to="to" class="f-thumbnail">
    <FAImage class="f-thumbnail__img" :src="src" :alt="title" />
    <FATitle v-if="title" :size="titleSize" class="f-thumbnail__title">{{
      title
    }}</FATitle>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
    title?: string;
    titleSize?: (typeof TitleSizes)[string];
    to?: string | object;
  }>(),
  {
    titleSize: "xs",
  },
);
</script>

<style lang="scss">
.f-thumbnail {
  $self: &;

  position: relative;
  display: block;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    #{$self}__img {
      transform: scale(1.05);
    }
    #{$self}__title {
      background-color: transparent;
    }
  }

  &__img {
    width: 100%;
    aspect-ratio: var(--thumbnail-ratio);
    z-index: var(--z-index-default);
    transition: transform ease 0.3s;
  }

  &__title {
    color: var(--thumbnail-color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-above);
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--thumbnail-overlay);
    transition: background-color ease 0.3s;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }

    .f-title {
      background-color: transparent;
    }
  }
}
</style>
