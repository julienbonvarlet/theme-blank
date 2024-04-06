export const useProductsStore = defineStore("products", () => {
  const { $API } = useNuxtApp();

  // States
  const products = ref([]);

  // Actions
  const fetchProducts = async (filters = {}, sortOptions = {}, page = 1, itemsPerPage = 10) => {
    const filterQuery = Object.entries(filters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const sortQuery = Object.entries(sortOptions)
      .map(([key, value]) => `sort[${key}]=${value}`)
      .join("&");

    const response = await $API.article.apiCustomerArticlesGetCollection({
      page,
      itemsPerPage,
      query: `${filterQuery}&${sortQuery}`,
    });

    products.value = response["hydra:member"];
    return products.value;
  };

  const fetchProductById = async (id) => {
    const response = await $API.article.apiCustomerArticlesIdGet({ id });
    return response;
  };

  const fetchCollections = async (page = 1, itemsPerPage = 10) => {
    const response = await $API.article.apiCustomerCollectionsGetCollection({
      page,
      itemsPerPage,
    });
    return response["hydra:member"];
  };

  const fetchCollectionById = async (id) => {
    const response = await $API.article.apiCustomerCollectionsIdGet(id);
    return response;
  };

  return {
    products,
    fetchProducts,
    fetchProductById,
    fetchCollections,
    fetchCollectionById,
  };
});
