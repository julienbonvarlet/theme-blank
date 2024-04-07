import type { TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail, TradeIn_jsonld_trade_in_read } from "@faume-tech/sdk-recommerce";

export const useTradeInModule = defineStore("tradeInModule", () => {
  const lodash = require("lodash-es");

  const tradeInStore = useTradeInStore();
  const { sortSizes } = useSort();

  type Article = {
    sku: string | null;
    color: string | null;
    size: string | null;
    condition: string | null;
  };

  const article = ref<Article>({
    sku: null,
    color: null,
    size: null,
    condition: null,
  });
  const cart = ref();
  const cartAgree = ref();
  const channel = ref();
  const agree = ref();
  const selectedAddress = ref();
  const colors = ref<string[] | null>(null);
  const sizes = ref<string[] | null>(null);
  const conditions = ref<string[]>(["new", "excellent", "very_good"]);
  const isInvalidSku = ref(false);
  const isValidSku = ref(false);
  const skuSuggestions = ref<string[]>([]);

  const setAgree = (value: string) => {
    agree.value = value;
  };

  const getSku = async () => {
    skuSuggestions.value = [];
    isInvalidSku.value = false;
    isValidSku.value = false;
    const sku = article.value.sku;
    if (sku && sku !== "") {
      try {
        const response = await tradeInStore.searchBySku(sku);
        skuSuggestions.value = response?.slice(0, 20) as string[];
        if (!skuSuggestions.value?.length) {
          isInvalidSku.value = true;
        } else if (skuSuggestions.value?.includes(sku)) {
          isValidSku.value = true;
        }
      } catch (error) {
        isInvalidSku.value = true;
        throw error;
      }
    }
  };

  const getSizesAndColors = async () => {
    const response = await tradeInStore.fetchAvailableSizesAndColors(article.value.sku!);
    colors.value = lodash.sortBy(response.color) || [];
    sizes.value = sortSizes(response.size) || [];
  };

  const setCart = (data: TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail) => {
    cart.value = data;
  };

  const createCart = async () => {
    const response = await useNuxtApp().$post<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>("/api/v3/customer/trade-in-carts", {
      body: {
        channel: channel.value,
      },
    });

    setCart(response);
  };

  const addToCart = async () => {
    if (!cart.value) {
      await createCart();
    }
    const newArticle = await useNuxtApp().$post("/api/v3/customer/trade-ins", {
      body: {
        ...article.value,
        tradeInCart: cart.value["@id"],
      },
    });
    setCart({ ...cart.value, items: [...cart.value.items, newArticle] });
    article.value = {
      size: null,
      color: null,
      condition: null,
      sku: null,
    };
    return newArticle;
  };

  const removeFromCart = async (tradeInId: string) => {
    if (tradeInId) {
      setCart({
        ...cart.value,
        items: [...cart.value.items.filter((x: TradeIn_jsonld_trade_in_read) => x.id !== tradeInId)],
      });

      await useNuxtApp().$delete(`/api/v3/customer/trade-ins/${tradeInId}`);
    }
  };

  const setSku = (sku: string | null) => {
    article.value.sku = sku;
  };

  const setColor = (color: string | null) => {
    article.value.color = color;
  };

  const setSize = (size: string | null) => {
    article.value.size = size;
  };

  const setCondition = (condition: string | null) => {
    article.value.condition = condition;
  };

  const reset = () => {
    article.value = {
      sku: null,
      color: null,
      size: null,
      condition: null,
    };
    cart.value = null;
    colors.value = null;
    sizes.value = null;
    agree.value = false;
    selectedAddress.value = null;
  };

  const selectAddress = async (tradeInCartId: string) => {
    selectedAddress.value = tradeInCartId;
    const response = await useNuxtApp().$patch<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-in-carts/${tradeInCartId}`, {
      body: {
        shippingAddress: selectedAddress.value,
      },
    });
    setCart(response);

    return response;
  };

  const confirmCart = async (tradeInCartId: string) => {
    const response = await useNuxtApp().$patch<TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-in-carts/${tradeInCartId}`, { body: {} });
    setCart(response);

    return response;
  };

  const setCartAgree = (value: string) => {
    cartAgree.value = value;
  };

  const resumeTradeInCart = (tradeInCart: TradeInCart_jsonld_trade_in_cart_read_trade_in_read_trade_in_read_detail) => {
    channel.value = "web";
    cartAgree.value = true;
    agree.value = true;
    cart.value = { ...tradeInCart };
    selectedAddress.value = tradeInCart.shippingAddress;
  };

  return {
    article,
    cart,
    colors,
    sizes,
    conditions,
    skuSuggestions,
    isValidSku,
    isInvalidSku,
    getSku,
    agree,
    selectedAddress,
    cartAgree,
    getSizesAndColors,
    addToCart,
    reset,
    removeFromCart,
    setAgree,
    selectAddress,
    confirmCart,
    setCartAgree,
    setSku,
    setColor,
    setSize,
    setCondition,
    resumeTradeInCart,
  };
});
