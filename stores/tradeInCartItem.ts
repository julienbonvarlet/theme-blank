export const useTradeInCartItem = defineStore("tradeInCartItem", () => {
  const { $API } = useNuxtApp();

  const getCartItemControlledPhoto = async (id: number | string) => {
    if (!id) {
      return null;
    }
    const response =
      await $API.tradeInCartItemPhoto.apiCustomerTradeInCartItemPhotosIdGet(id);
    return response?.url;
  };

  return {
    getCartItemControlledPhoto,
  };
});
