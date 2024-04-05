import { ref, onMounted } from "vue";
import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

export const useCollectionsStore = defineStore("collectionsStore", () => {
  const { $API } = useNuxtApp();
  const config = useRuntimeConfig();
  const collectionsConfig = config.public.faume.collectionsConfig;
  const menuConfig = config.public.faume.menuConfig;

  const collections = ref([]);

  const getCollectionBySlug = (slug) =>
    collections.value?.find((x) => x.slugName === slug);
  const getCollectionTitle = (slug) =>
    collections.value?.find((x) => x.slugName === slug)?.name;
  const getCollectionDescription = (slug) =>
    collections.value?.find((x) => x.slugName === slug)?.description;

  onMounted(async () => {
    if (!collections.value?.length) {
      const response =
        await $API.collection.apiCustomerCollectionsGetCollection();
      let data = response?.["hydra:member"];
      data = data.map((collection) => {
        let collectionData = {
          ...collection,
          title: collection.name?.split(" - ").pop(),
          to: {
            name: "collection",
            params: { id: collection.slugName },
          },
        };
        const config = collectionsConfig?.find(
          (x) => x.slugName === collection.slugName,
        );
        if (config) collectionData = { ...collectionData, ...config };
        return collectionData;
      });
      collections.value = data;
    }
  });

  return {
    collections,
    getCollectionBySlug,
    getCollectionTitle,
    getCollectionDescription,
  };
});
