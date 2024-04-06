<template>
  <FMThumbnail class="f-collection-card" :visual="collection" :title="title || collection.label" :title-size="titleSize" />
</template>

<script lang="ts" setup>
import { TitleSizes } from "~/types/enums";
import type { MenuVisual } from "~/types/types";

const props = withDefaults(
  defineProps<{
    collection: MenuVisual;
    title?: string;
    titleSize?: TitleSizes;
  }>(),
  {
    titleSize: TitleSizes.M,
  },
);
</script>

<style lang="scss">
.f-collection-card {
  aspect-ratio: var(--f-collection-image-ratio);

  img {
    height: 100%;
  }
}
</style>
