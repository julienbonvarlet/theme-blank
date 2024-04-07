import type { TradeInAvailableColorsAndSizes_jsonld, TradeInMerchandising_jsonld } from "@faume-tech/sdk-recommerce";

export const useTradeInStore = defineStore("tradeIn", () => {
  const { $API } = useNuxtApp();
  const tradeIns = ref<TradeIn_jsonld[]>([]);
  const tradeInDetails = ref<TradeIn_jsonld | null>(null);

  const fetchTradeIns = async (page = 1, itemsPerPage = 10) => {
    const response = await $API.tradeIn.apiCustomerTradeInsGetCollection(page, itemsPerPage);
    tradeIns.value = response["hydra:member"];
    return response;
  };

  const fetchTradeInById = async (id: string) => {
    const response = await $API.tradeIn.apiCustomerTradeInsIdGet(id);
    tradeInDetails.value = response;
    return response;
  };

  const fetchAvailableSizesAndColors = async (sku: string) => {
    const response = await $API.tradeIn.apiCustomerTradeInsgetAvailableSizesAndColorsSkuGet(sku);
    return response as TradeInAvailableColorsAndSizes_jsonld;
  };

  const createTradeInMerchandising = async (merchandisingData: TradeInMerchandising_TradeInMerchandisingInput_jsonld) => {
    const response = await $API.tradeIn.apiCustomerTradeInsmerchandisingPost(merchandisingData);
    return response as TradeInMerchandising_jsonld;
  };

  const searchBySku = async (sku: string) => {
    const response = await $API.tradeIn.apiCustomerTradeInssearchBySkuSkuGet(sku);
    return response.results;
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
