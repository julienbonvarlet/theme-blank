import type {
  TradeInCart_UpdateTradeInCartInput,
  TradeInCart_jsonld_trade_in_cart_read_trade_in_read,
  TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail,
} from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useTradeInCartStore = defineStore("tradeInCart", () => {
  const tradeInCart = ref<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail | null>(null);
  const tradeInCarts = ref<TradeInCart_jsonld_trade_in_cart_read_trade_in_read[] | null>([]);

  const fetchTradeInCarts = async (page = 1, itemsPerPage = 10) => {
    const { items } = await useNuxtApp().$getCollection<ApiCollection<TradeInCart_jsonld_trade_in_cart_read_trade_in_read>>(
      `/api/v3/customer/trade-in-carts?page=${page}&itemsPerPage=${itemsPerPage}`,
    );
    tradeInCarts.value = items;

    return items;
  };

  const fetchTradeInCart = async (tradeInCartId: string) => {
    const response = await useNuxtApp().$get<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-in-carts/${tradeInCartId}`);
    tradeInCart.value = response;

    return response;
  };

  const createTradeInCart = async () => {
    const response = await useNuxtApp().$post<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>("/api/v3/customer/trade-in-carts", {
      body: {
        channel: "web",
      },
    });
    tradeInCart.value = response;

    return response;
  };

  const updateTradeInCart = async (tradeInCartId: string, updateData: TradeInCart_UpdateTradeInCartInput) => {
    const response = await useNuxtApp().$patch<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-in-carts/${tradeInCartId}`, { body: updateData });
    tradeInCart.value = response;

    return response;
  };

  const validateTradeInCart = async (tradeInCartId: string) => {
    const response = await useNuxtApp().$patch<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-in-carts/${tradeInCartId}/validate`, { body: {} });
    tradeInCart.value = response;

    return response;
  };

  return {
    tradeInCart,
    tradeInCarts,
    fetchTradeInCarts,
    fetchTradeInCart,
    createTradeInCart,
    updateTradeInCart,
    validateTradeInCart,
  };
});
