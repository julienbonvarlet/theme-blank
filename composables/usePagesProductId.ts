import type { TradeIn_jsonld_trade_in_read_trade_in_read_detail } from "@faume-tech/sdk-recommerce";

export const usePagesProductId = async () => {
  const route = useRoute();
  const productId = route.params.id;
  const cartStore = useCartStore();
  const recentlyViewedProductsStore = useRecentlyViewedProductsStore();

  const choice = ref<null | object>(null);

  const { data: product, pending, error } = await useAsyncData<TradeIn_jsonld_trade_in_read_trade_in_read_detail>("product", () => useNuxtApp().$get(`/api/v3/customer/trade-ins/${productId}`));

  recentlyViewedProductsStore.addProduct(product.value);

  useSeoMeta({
    title: "Product " + productId,
    description: "An awesome product",
    ogTitle: "FAUME: Product " + productId,
    ogDescription: "An awesome product",
    ogImage: "[og:image]",
    ogUrl: "[og:url]",
    twitterTitle: "[twitter:title]",
    twitterDescription: "[twitter:description]",
    twitterImage: "[twitter:image]",
    twitterCard: "summary",
  });

  const addToCart = (product: TradeIn_jsonld_trade_in_read_trade_in_read_detail) => {
    cartStore.addToCart(product.value);
  };

  const updateChoice = (data) => {
    choice.value = data;
  };

  watch(
    product,
    (data) => {
      choice.value = data?.choices?.[0];
    },
    { immediate: true },
  );

  return {
    productId,
    product,
    choice,
    pending,
    error,
    addToCart,
    updateChoice,
  };
};
