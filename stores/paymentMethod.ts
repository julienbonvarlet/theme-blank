export const usePaymentMethodsStore = defineStore("paymentMethod", () => {
  const { $API } = useNuxtApp();
  const paymentMethods = ref(null);

  const fetchPaymentMethodsForOrder = async (orderId, page = 1, itemsPerPage = 10) => {
    const response = await $API.paymentMethod.apiCustomerOrdersOrderIdpaymentMethodsGetCollection(orderId, page, itemsPerPage);
    paymentMethods.value = response["hydra:member"];
    return paymentMethods.value;
  };

  const fetchPaymentMethodById = async (id) => {
    const response = await $API.paymentMethod.apiCustomerPaymentMethodsIdGet({
      id,
    });
    return response;
  };

  return {
    paymentMethods,
    fetchPaymentMethodsForOrder,
    fetchPaymentMethodById,
  };
});
