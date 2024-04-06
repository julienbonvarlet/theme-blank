<template>
  <FMThumbnail
    v-if="collection?.thumbnail"
    class="f-collection-card"
    :src="collection.thumbnail"
    :title="title || collection.title"
    :title-size="titleSize"
    :to="collection.to"
    @click="handleClick"
  />
</template>

<script lang="ts" setup>
const { getCollectionBySlug } = useCollectionsStore();

const props = withDefaults(
  defineProps<{
    slug: string;
    title?: string;
    titleSize?: (typeof TitleSizes)[string];
  }>(),
  {
    titleSize: "m",
  }
);

const collection = computed(() => getCollectionBySlug(props.slug));

const emit = defineEmits(["collection-click"]);

function handleClick() {
  emit("collection-click");
}
</script>

<style lang="scss">
.f-collection-card {
  aspect-ratio: var(--f-collection-image-ratio);

  img {
    height: 100%;
  }
}
</style>
