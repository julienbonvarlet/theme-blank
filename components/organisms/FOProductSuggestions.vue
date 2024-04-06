<template>
  <FOCarouselContainer
    v-if="suggestionsProducts?.length"
    class="f-product-suggestions"
    :title="$t('pages.product.suggestions.title')"
    :title-size="titleSize"
    :carousels="carousels"
  />
</template>

<script lang="ts" setup>
const { t } = useI18n();
const recentlyViewedProductsStore = useRecentlyViewedProductsStore();
const {
  getSuggestions,
  products: suggestionsProducts,
  unsetProducts,
} = useProductsSuggestions();

const props = defineProps<{
  gender?: string | string[];
  size?: string | string[];
  type?: string | string[];
  color?: string | string[];
  titleSize?: (typeof TitleSizes)[string];
}>();

const recentlyViewedProducts = computed(
  () => recentlyViewedProductsStore.allowedProducts,
);

const recentlyViewCarousel = computed(() => ({
  title: t("pages.product.suggestions.tab_recently_viewed"),
  products: recentlyViewedProducts.value?.length
    ? [...recentlyViewedProducts.value]
    : [],
}));

const suggestionsCarousel = computed(() => ({
  title: t("pages.product.suggestions.tab_suggestions"),
  products: suggestionsProducts.value?.length
    ? [...suggestionsProducts.value]
    : [],
}));

const carousels = computed(() =>
  recentlyViewedProducts.value?.length
    ? [suggestionsCarousel.value, recentlyViewCarousel.value]
    : [suggestionsCarousel.value],
);

watch(
  () => [props.size, props.color, props.gender, props.type],
  () => {
    getSuggestions({
      gender: props.gender,
      size: props.size,
      type: props.type,
      color: props.color,
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  unsetProducts();
});
</script>
