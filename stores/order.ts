import type { OrderItem_jsonld, Order_OrderInput_jsonld, Order_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useOrdersStore = defineStore("order", () => {
  const { $getCollection, $get, $post, $patch, $delete } = useNuxtApp();

  const orders = ref<any[] | null>(null);

  const addOrderItem = async (orderIri: string, tradeInIri: string) => {
    return await $post<OrderItem_jsonld>("/api/v3/customer/order-items", {
      body: {
        order: orderIri,
        tradeIn: tradeInIri,
      },
    });
  };

  const getOrderItemById = async (orderItemId: string) => {
    return await $get<OrderItem_jsonld>(`/api/v3/customer/order-items/${orderItemId}`);
  };

  const deleteOrderItem = async (orderItemId: string) => {
    await $delete(`/api/v3/customer/order-items/${orderItemId}`);
  };

  const fetchOrders = async (page = 1, itemsPerPage = 10) => {
    const { items } = await $getCollection<ApiCollection<Order_jsonld>>(`/api/v3/customer/orders?page=${page}&itemsPerPage=${itemsPerPage}`);
    orders.value = items;

    return orders.value;
  };

  const createOrder = async (orderData: Order_OrderInput_jsonld) => {
    return await $post<Order_jsonld>("/api/v3/customer/orders", { body: orderData });
  };

  const getOrderById = async (orderId: string) => {
    return await $get<Order_jsonld>(`/api/v3/customer/orders/${orderId}`);
  };

  const deleteOrder = async (orderId: string) => {
    await $delete(`/api/v3/customer/orders/${orderId}`);
  };

  const updateOrder = async (orderId: string, updatedData: Order_OrderInput_jsonld) => {
    return await $patch<Order_jsonld>(`/api/v3/customer/orders/${orderId}`, { body: updatedData });
  };

  const fetchDropoffPoints = async (orderId: string, page = 1, itemsPerPage = 10) => {
    return await $getCollection(`/api/v3/customer/orders/${orderId}/dropoffpoints?page=${page}&itemsPerPage=${itemsPerPage}`);
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
