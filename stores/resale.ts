export const useResalesStore = defineStore("resale", () => {
  const { $API } = useNuxtApp();

  const page = ref(1);
  const itemsPerPage = ref(10);
  const resales = ref<any[] | null>(null);

  const fetchResales = async () => {
    const response = await $API.tradeIn.apiCustomerTradeInsGetCollection(page.value, itemsPerPage.value);
    resales.value = response["hydra:member"] || [];
    return resales.value;
  };

  const getResaleById = async (id) => {
    const response = await $API.tradeIn.apiCustomerTradeInsIdGet(id);
    return response;
  };

  return {
    resales,
    fetchResales,
    getResaleById,
  };
});
