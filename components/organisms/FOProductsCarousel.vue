<template>
  <FOCarouselContainer
    v-if="carousels"
    :title="title"
    :subtitle="subtitle"
    :text="text"
    :carousels="carousels"
    :link1="link1"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  text?: string;
  link1?: Record<string, any>;
}>();

const productStore = useProductsStore();

const {
  data: products,
  pending,
  error,
} = useAsyncData("unique-key-for-products", () => {
  return productStore.fetchProducts(1, 12);
});

const carousels = computed(() => {
  return products.value?.length && typeof products.value[0] === "object"
    ? [{ products: products.value }]
    : null;
});
</script>
