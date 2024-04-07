import type { Article_jsonld, Collection_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useArticleStore = defineStore("article", () => {
  const articles = ref<Article_jsonld[]>([]);

  const fetchArticles = async (filters = {}, sortOptions = {}, page = 1, itemsPerPage = 10) => {
    const filterQuery = Object.entries(filters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
      .join("&");

    const sortQuery = Object.entries(sortOptions)
      .map(([key, value]) => `sort[${key}]=${value}`)
      .join("&");

    const { items } = await useNuxtApp().$getCollection<ApiCollection<Article_jsonld>>(`/api/v3/customer/articles?page=${page}&itemsPerPage=${itemsPerPage}&${filterQuery}&${sortQuery}`);
    articles.value = items;

    return articles.value;
  };

  const fetchArticleById = async (articleId: string) => {
    return await useNuxtApp().$get<Article_jsonld>(`/api/v3/customer/articles/${articleId}`);
  };

  const fetchCollections = async (page = 1, itemsPerPage = 10) => {
    const { items } = await useNuxtApp().$getCollection<ApiCollection<Collection_jsonld>>(`/api/v3/customer/collections?page=${page}&itemsPerPage=${itemsPerPage}`);

    return items;
  };

  const fetchCollectionById = async (collectionId: string) => {
    return await useNuxtApp().$get<Collection_jsonld>(`/api/v3/customer/collections/${collectionId}`);
  };

  return {
    articles,
    fetchArticles,
    fetchArticleById,
    fetchCollections,
    fetchCollectionById,
  };
});
