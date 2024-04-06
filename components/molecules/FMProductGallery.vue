<template>
  <div class="f-product-gallery">
    <div v-for="photo in photos" :key="photo" class="f-product-gallery__items">
      <img :src="photo" alt="Faume" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  photos: string[];
}>();
</script>

<style lang="scss">
.f-product-gallery {
  --gap: var(--f-length-1);
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);

  &__items {
    position: relative;
    width: calc((100% - var(--gap)) / 2); // Pour les écrans plus larges

    @include media("<=tablet") {
      width: inherit;
    }

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      mix-blend-mode: multiply;
      z-index: calc(var(--z-index-above) + 1);
      background: radial-gradient(circle, transparent, transparent, var(--f-color-background-light));
    }
  }

  img {
    width: 100%;
    aspect-ratio: var(--f-product-image-ratio);
    object-fit: cover;
    z-index: var(--z-index-below);
    position: relative;
    @include media("<=tablet") {
      width: 70vw;
    }
  }

  @include media("<=tablet") {
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    flex-wrap: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
