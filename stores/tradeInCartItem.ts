export const useTradeInCartItemStore = defineStore("tradeInCartItem", () => {
  const { $API } = useNuxtApp();
  const items = ref<TradeInCartItem[]>([]);

  // Actions
  const fetchItems = async () => {
    try {
      const response = await $API.tradeInCartItem.apiCustomerTradeInCartItemsGetCollection();
      items.value = response["hydra:member"];
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des articles du panier:", error);
    }
  };

  const createItem = async (itemData) => {
    try {
      const response = await $API.tradeInCartItem.apiCustomerTradeInCartItemsPost(itemData);
      items.value.push(response);
      return response;
    } catch (error) {
      console.error("Erreur lors de la création d'un article du panier:", error);
    }
  };

  const fetchItem = async (id) => {
    try {
      return await $API.tradeInCartItem.apiCustomerTradeInCartItemsIdGet(id);
    } catch (error) {
      console.error("Erreur lors de la récupération d'un article du panier:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await $API.tradeInCartItem.apiCustomerTradeInCartItemsIdDelete(id);
      items.value = items.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Erreur lors de la suppression d'un article du panier:", error);
    }
  };

  return {
    items,
    fetchItems,
    createItem,
    fetchItem,
    deleteItem,
  };
});
