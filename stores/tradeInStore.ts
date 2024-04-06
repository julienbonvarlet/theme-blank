export const useTradeInStore = defineStore("tradeIn", () => {
  const { $API } = useNuxtApp();
  const tradeIns = ref<TradeIn_jsonld[]>([]);
  const tradeInDetails = ref<TradeIn_jsonld | null>(null);

  const fetchTradeIns = async (page = 1, itemsPerPage = 10) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsGetCollection(page, itemsPerPage);
      tradeIns.value = response["hydra:member"];
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des TradeIns:", error);
      throw error;
    }
  };

  const fetchTradeInById = async (id: string) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsIdGet(id);
      tradeInDetails.value = response;
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération du TradeIn:", error);
      throw error;
    }
  };

  const fetchAvailableSizesAndColors = async (sku: string) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsgetAvailableSizesAndColorsSkuGet(sku);
      return response as TradeInAvailableColorsAndSizes_jsonld;
    } catch (error) {
      console.error("Erreur lors de la récupération des tailles et couleurs disponibles:", error);
      throw error;
    }
  };

  const createTradeInMerchandising = async (
    merchandisingData: TradeInMerchandising_TradeInMerchandisingInput_jsonld,
  ) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInsmerchandisingPost(merchandisingData);
      return response as TradeInMerchandising_jsonld;
    } catch (error) {
      console.error("Erreur lors de la création du TradeInMerchandising:", error);
      throw error;
    }
  };

  const searchBySku = async (sku: string) => {
    try {
      const response = await $API.tradeIn.apiCustomerTradeInssearchBySkuSkuGet(sku);
      return response.results;
    } catch (error) {
      console.error("Erreur lors de la recherche par SKU:", error);
      throw error;
    }
  };

  return {
    tradeIns,
    tradeInDetails,
    fetchTradeIns,
    fetchTradeInById,
    fetchAvailableSizesAndColors,
    createTradeInMerchandising,
    searchBySku,
  };
});
