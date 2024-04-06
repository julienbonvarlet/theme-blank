<template>
  <div class="f-collections-list">
    <FMCollectionCard
      v-for="collection in collections"
      :key="collection"
      :collection="collection"
      :title-size="titleSize"
    />
  </div>
</template>

<script setup lang="ts">
import type { TitleSizes } from "~/types/enums";

const props = defineProps<{
  collections: any[];
  titleSize?: TitleSizes;
}>();
</script>

<style lang="scss">
.f-collections-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--f-length-1);

  .f-collection-card {
    width: 200px;
  }
}
</style>
