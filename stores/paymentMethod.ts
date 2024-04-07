import type { PaymentMethod_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const usePaymentMethodsStore = defineStore("paymentMethod", () => {
  const paymentMethods = ref<PaymentMethod_jsonld[]>([]);

  const fetchPaymentMethodsForOrder = async (orderId: string, page = 1, itemsPerPage = 10) => {
    const { items } = await useNuxtApp().$getCollection<ApiCollection<PaymentMethod_jsonld>>(`/api/v3/customer/orders/${orderId}/payment-methods?page=${page}&itemsPerPage=${itemsPerPage}`);
    paymentMethods.value = items;
    return paymentMethods.value;
  };

  const fetchPaymentMethodById = async (paymentMetnodId: string) => {
    return await useNuxtApp().$get<PaymentMethod_jsonld>(`/api/v3/customer/payment-methods/${paymentMetnodId}`);
  };

  return {
    paymentMethods,
    fetchPaymentMethodsForOrder,
    fetchPaymentMethodById,
  };
});
