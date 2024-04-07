import type { ShippingMethod_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useShippingMethodsStore = defineStore("shippingMethod", () => {
  const shippingMethods = ref<ShippingMethod_jsonld[]>([]);

  const fetchShippingMethodsForOrder = async (orderId: string, page = 1, itemsPerPage = 10) => {
    const { items } = await useNuxtApp().$getCollection<ApiCollection<ShippingMethod_jsonld>>(`/api/v3/customer/orders/${orderId}/shipping-methods?page=${page}&itemsPerPage=${itemsPerPage}`);
    shippingMethods.value = items;

    return shippingMethods.value;
  };

  const fetchShippingMethodById = async (shippingMethodId: string) => {
    return await useNuxtApp().$get<ShippingMethod_jsonld>(`/api/v3/customer/shipping-methods/${shippingMethodId}`);
  };

  return {
    shippingMethods,
    fetchShippingMethodsForOrder,
    fetchShippingMethodById,
  };
});
