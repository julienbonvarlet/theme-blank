export function useAsyncOrderItems(apiConfig: any = {}, order: any) {
  const items = ref<null | array>(null);

  const loadItems = async () => {
    if (!order || !order.items) {
      items.value = [];
      return;
    }
    const data = await fetchAllData(order.items, apiConfig);
    items.value = data;
  };

  loadItems();

  return { items };
}
