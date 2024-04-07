export const useTradeInCartStore = defineStore("tradeInCart", () => {
  const { $API } = useNuxtApp();
  const tradeInCart = ref(null);
  const tradeInCarts = ref<array | null>(null);

  const createTradeInCart = async () => {
    try {
      // Ajoutez ici le corps de la requête avec le champ 'channel'
      const requestBody = {
        channel: "web",
      };
      const response = await $API.tradeInCart.apiCustomerTradeInCartsPost(requestBody);
      tradeInCart.value = response;
      return response;
    } catch (error) {
      console.error("Error creating TradeInCart:", error);
      throw error;
    }
  };

  const fetchTradeInCart = async (id: string) => {
    try {
      const response = await $API.tradeInCart.apiCustomerTradeInCartsIdGet(id);
      tradeInCart.value = response;
      return response;
    } catch (error) {
      console.error("Error fetching TradeInCart:", error);
      throw error;
    }
  };

  const fetchTradeInCarts = async () => {
    try {
      const apiConfig = getAxiosConfig($API.tradeInCart?.httpRequest?.config || {});
      const response = await axios.get("/api/v3/customer/trade-in-carts", apiConfig);
      tradeInCarts.value = response?.data["hydra:member"] || [];
      return response;
    } catch (error) {
      tradeInCarts.value = [];
      throw error;
    }
  };

  const updateTradeInCart = async (id, updateData) => {
    try {
      const response = await $API.tradeInCart.apiCustomerTradeInCartsIdPatch(id, updateData);
      tradeInCart.value = response;
      return response;
    } catch (error) {
      console.error("Error updating TradeInCart:", error);
      throw error;
    }
  };

  const validateTradeInCart = async (id) => {
    try {
      const response = await $API.tradeInCart.apiCustomerTradeInCartsIdvalidatePatch(id, {});
      tradeInCart.value = response;
      return response;
    } catch (error) {
      console.error("Error validating TradeInCart:", error);
      throw error;
    }
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
