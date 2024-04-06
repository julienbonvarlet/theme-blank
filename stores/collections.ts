import faumeConfig from "~/faumeConfig";

type Collections = {
  name: String;
  slugName: String;
};

export const useCollectionsStore = defineStore("collectionsStore", () => {
  const { $getCollection } = useNuxtApp();

  const collections = ref<Collections[]>([]);

  const getCollectionBySlug = (slug: String) => collections.value?.find((x) => x.slugName === slug);
  const getCollectionTitle = (slug: String) => collections.value?.find((x) => x.slugName === slug)?.name;

  onMounted(async () => {
    if (!collections.value?.length) {
      const { items } = await $getCollection<ApiCollection<Collections>>("/api/v3/customer/collections");
      const data = items.map((collection) => {
        let collectionData = {
          ...collection,
          title: collection.name?.split(" - ").pop(),
          to: {
            name: "collection",
            params: { id: collection.slugName },
          },
        };
        const config = faumeConfig.collections.find((x) => x.slugName === collection.slugName);
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
  };
});
