export const useTradeInCartStore = defineStore("tradeInCart", () => {
  const { $API } = useNuxtApp();
  const tradeInCart = ref(null);
  const tradeInCarts = ref<array | null>(null);

  const createTradeInCart = async () => {
    const requestBody = {
      channel: "web",
    };
    const response = await $API.tradeInCart.apiCustomerTradeInCartsPost(requestBody);
    tradeInCart.value = response;
    return response;
  };

  const fetchTradeInCart = async (id: string) => {
    const response = await $API.tradeInCart.apiCustomerTradeInCartsIdGet(id);
    tradeInCart.value = response;
    return response;
  };

  const fetchTradeInCarts = async () => {
    const apiConfig = getAxiosConfig($API.tradeInCart?.httpRequest?.config || {});
    const response = await axios.get("/api/v3/customer/trade-in-carts", apiConfig);
    tradeInCarts.value = response?.data["hydra:member"] || [];
    return response;
  };

  const updateTradeInCart = async (id, updateData) => {
    const response = await $API.tradeInCart.apiCustomerTradeInCartsIdPatch(id, updateData);
    tradeInCart.value = response;
    return response;
  };

  const validateTradeInCart = async (id) => {
    const response = await $API.tradeInCart.apiCustomerTradeInCartsIdvalidatePatch(id, {});
    tradeInCart.value = response;
    return response;
  };

  return {
    tradeInCart,
    tradeInCarts,
    createTradeInCart,
    fetchTradeInCart,
    updateTradeInCart,
    validateTradeInCart,
    fetchTradeInCarts,
  };
});
