export const useOrdersStore = defineStore("order", () => {
  const { $API } = useNuxtApp();

  const page = ref(1);
  const itemsPerPage = ref(10);
  const orders = ref<any[] | null>(null);

  const addOrderItem = async (orderUrl, articleChoiceUrl) => {
    const response = await $API.orderItem.apiCustomerOrderItemsPost({
      order: orderUrl,
      tradeIn: articleChoiceUrl,
    });
    return response;
  };

  const getOrderItemById = async (id) => {
    const response = await $API.orderItem.apiCustomerOrderItemsIdGet(id);
    return response;
  };

  const deleteOrderItem = async (id) => {
    await $API.orderItem.apiCustomerOrderItemsIdDelete(id);
    console.log("Article supprimé de la commande avec succès");
  };

  const fetchOrders = async () => {
    const response = await $API.order.apiCustomerOrdersGetCollection(page.value, itemsPerPage.value);
    orders.value = response["hydra:member"] || [];
    return orders.value;
  };

  const createOrder = async (orderData) => {
    const response = await $API.order.apiCustomerOrdersPost(orderData);
    return response;
  };

  const getOrderById = async (id) => {
    const response = await $API.order.apiCustomerOrdersIdGet(id);
    return response;
  };

  const deleteOrder = async (id) => {
    await $API.order.apiCustomerOrdersIdDelete({ id });
  };

  const updateOrder = async (id, updatedData) => {
    const response = await $API.order.apiCustomerOrdersIdPatch(id, updatedData);
    return response;
  };

  const fetchDropoffPoints = async (orderId, page = 1, itemsPerPage = 10) => {
    const response = await $API.order.apiCustomerOrdersIddropoffpointsGetCollection({
      id: orderId,
      page,
      itemsPerPage,
    });
    return response;
  };

  return {
    orders,
    addOrderItem,
    getOrderItemById,
    deleteOrderItem,
    fetchOrders,
    createOrder,
    getOrderById,
    deleteOrder,
    updateOrder,
    fetchDropoffPoints,
  };
});
