export const useShippingMethodsStore = defineStore("shippingMethod", () => {
  const { $API } = useNuxtApp();
  const shippingMethods = ref(null);

  const fetchShippingMethodsForOrder = async (orderId) => {
    const response = await $API.shippingMethod.apiCustomerOrdersOrderIdshippingMethodsGetCollection(orderId);
    shippingMethods.value = response["hydra:member"];
    return shippingMethods.value;
  };

  const fetchShippingMethodById = async (id) => {
    const response = await $API.shippingMethod.apiCustomerShippingMethodsIdGet({ id });
    return response;
  };

  return {
    shippingMethods,
    fetchShippingMethodsForOrder,
    fetchShippingMethodById,
  };
});
