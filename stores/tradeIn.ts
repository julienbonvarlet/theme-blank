import type {
  TradeInAvailableColorsAndSizes_jsonld,
  TradeInMerchandising_TradeInMerchandisingInput_jsonld,
  TradeInMerchandising_jsonld,
  TradeInSearchBySku_jsonld,
  TradeIn_TradeInInput_jsonld,
  TradeIn_jsonld_trade_in_read,
  TradeIn_jsonld_trade_in_read_trade_in_read_detail,
} from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useTradeInCartItem = defineStore("tradeIn", () => {
  const { $getCollection, $get, $post, $delete } = useNuxtApp();

  const tradeIns = ref<TradeIn_jsonld_trade_in_read[]>([]);

  const fetchTradeIns = async (page = 1, itemsPerPage = 10) => {
    const { items } = await $getCollection<ApiCollection<TradeIn_jsonld_trade_in_read>>(`/api/v3/customer/trade-ins?page=${page}&itemsPerPage=${itemsPerPage}`);
    tradeIns.value = items;

    return tradeIns.value;
  };

  const fetchTradeInById = async (tradeInId: string) => {
    return await $get<TradeIn_jsonld_trade_in_read_trade_in_read_detail>(`/api/v3/customer/articles/${tradeInId}`);
  };

  const createTradeIn = async (tradeInData: TradeIn_TradeInInput_jsonld) => {
    const response = await $post<TradeIn_jsonld_trade_in_read>("/api/v3/customer/articles", { body: tradeInData });
    tradeIns.value.push(response);

    return response;
  };

  const deleteTradeIn = async (tradeInId: string) => {
    await $delete(`/api/v3/customer/articles/${tradeInId}`);
    tradeIns.value = tradeIns.value.filter((item) => item.id !== tradeInId);
  };

  const getCartItemControlledPhoto = async (tradeInId: string) => {
    const tradeIn = await fetchTradeInById(tradeInId);

    type Metadata = {
      photos: Array<string>;
    };

    if (tradeIn.metadata && "photos" in tradeIn.metadata) {
      const metadata = tradeIn.metadata as Metadata;
      return metadata.photos[0];
    }

    return null;
  };

  const fetchAvailableSizesAndColors = async (sku: string) => {
    return await $get<TradeInAvailableColorsAndSizes_jsonld>(`/api/v3/customer/trade-ins/get-available-sizes-and-colors/${sku}`);
  };

  const searchBySku = async (sku: string) => {
    const { results } = await $get<TradeInSearchBySku_jsonld>(`/api/v3/customer/trade-ins/search-by-sku/${sku}`);

    return results;
  };

  const createTradeInMerchandising = async (merchandisingData: TradeInMerchandising_TradeInMerchandisingInput_jsonld) => {
    return await $post<TradeInMerchandising_jsonld>("/api/v3/customer/trade-ins/merchandising", { body: merchandisingData });
  };

  return {
    tradeIns,
    fetchTradeIns,
    fetchTradeInById,
    createTradeIn,
    deleteTradeIn,
    getCartItemControlledPhoto,
    fetchAvailableSizesAndColors,
    searchBySku,
    createTradeInMerchandising,
  };
});
