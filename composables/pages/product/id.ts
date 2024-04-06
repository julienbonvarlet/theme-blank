export const usePagesProductId = async () => {
  const { $API } = useNuxtApp();
  const route = useRoute();
  const productId = route.params.id;
  const cartStore = useCartStore();
  const recentlyViewedProductsStore = useRecentlyViewedProductsStore();

  const choice = ref<null | object>(null);

  const {
    data: product,
    pending,
    error,
  } = await useAsyncData<ArticleChoice_jsonld_article_choice_read>(
    "product",
    // TODO: temporary test, will use SDK to fetch product
    () => $API.article.apiCustomerArticlesIdGet(productId.toString())
  );

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

  const addToCart = (product: ArticleChoice_jsonld_article_choice_read) => {
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
    { immediate: true }
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
