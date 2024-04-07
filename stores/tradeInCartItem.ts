export const useTradeInCartItemStore = defineStore("tradeInCartItem", () => {
  const { $API } = useNuxtApp();
  const items = ref<TradeInCartItem[]>([]);

  const fetchItems = async () => {
    const response = await $API.tradeInCartItem.apiCustomerTradeInCartItemsGetCollection();
    items.value = response["hydra:member"];
    return response;
  };

  const createItem = async (itemData) => {
    const response = await $API.tradeInCartItem.apiCustomerTradeInCartItemsPost(itemData);
    items.value.push(response);
    return response;
  };

  const fetchItem = async (id) => {
    return await $API.tradeInCartItem.apiCustomerTradeInCartItemsIdGet(id);
  };

  const deleteItem = async (id) => {
    await $API.tradeInCartItem.apiCustomerTradeInCartItemsIdDelete(id);
    items.value = items.value.filter((item) => item.id !== id);
  };

  return {
    items,
    fetchItems,
    createItem,
    fetchItem,
    deleteItem,
  };
});
