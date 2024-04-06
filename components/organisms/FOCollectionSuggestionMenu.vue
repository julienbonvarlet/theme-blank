<template>
  <div class="f-collection-suggestion-menu">
    <FMCarousel>
      <FMCollectionCard v-for="(item, i) in suggestionMenuItems" :key="i" :collection="item" title-size="xs" class="f-collection-suggestion-menu__item" />
    </FMCarousel>
  </div>
</template>

<script setup lang="ts">
interface Item {
  photo: string;
  title: string;
  url: string;
}

const props = defineProps<{
  suggestionMenuItems: Item;
}>();
</script>

<style lang="scss">
.f-collection-suggestion-menu {
  .f-carousel {
    --gap: var(--f-carousel-container-gap);
    --items-visible: var(--f-collection-suggestion-menu-items-visible);
  }

  &__item {
    img {
      height: 100%;
    }
  }

  &__inner {
    & > .f-button {
      margin: var(--f-length-3) auto 0;
    }
  }
}
</style>
