<template>
  <FOCarouselContainer
    v-if="carousels"
    :title="title"
    :subitle="subtitle"
    :text="text"
    :carousels="carousels"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  text?: string;
  slugs?: array;
  fakeData?: array;
}>();

const collections = ref(null);

const collectionsFormated = computed(() => props.fakeData);

const carousels = computed(() => {
  return collectionsFormated.value?.length
    ? [{ collections: collectionsFormated.value }]
    : null;
});
</script>
