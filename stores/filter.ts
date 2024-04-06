export const useFiltersStore = defineStore("filter", () => {
  const { $API } = useNuxtApp();

  // States
  const filters = ref<any[] | null>(null);

  const getFilters = async () => {
    const response = await $API.article.apiCustomerArticlesGetCollection();
    filters.value = response["hydra:facets"] || [];
    return filters.value;
  };

  return {
    getFilters,
  };
});
