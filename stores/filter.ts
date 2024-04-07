import type { Article_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useFiltersStore = defineStore("filter", () => {
  const filters = ref<any[] | null>(null);

  const getFilters = async () => {
    const response = await useNuxtApp().$getCollection<ApiCollection<Article_jsonld>>("/api/v3/customer/articles");
    filters.value = response["hydra:facets"] || [];
    return filters.value;
  };

  return {
    getFilters,
  };
});
