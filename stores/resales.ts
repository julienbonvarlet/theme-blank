export const useResalesStore = defineStore("resales", () => {
  const { $API } = useNuxtApp();

  const page = ref(1);
  const itemsPerPage = ref(10);
  const resales = ref<any[] | null>(null);

  const fetchResales = async () => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsGetCollection(
        page.value,
        itemsPerPage.value,
      );
      resales.value = response["hydra:member"] || [];
      console.log("re", response);
      return resales.value;
    } catch (error) {
      console.error("Erreur lors de la récupération des reprises:", error);
      resales.value = [];
      throw error;
    }
  };

  const getResaleById = async (id) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsIdGet(id);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération d'une reprise:", error);
      throw error;
    }
  };

  return {
    resales,
    fetchResales,
    getResaleById,
  };
});
