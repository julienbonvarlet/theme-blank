export const usePaymentMethodsStore = defineStore("paymentMethod", () => {
  const { $API } = useNuxtApp();
  const paymentMethods = ref(null);

  // Récupérer la collection des méthodes de paiement pour une commande spécifique
  const fetchPaymentMethodsForOrder = async (orderId, page = 1, itemsPerPage = 10) => {
    try {
      const response = await $API.paymentMethod.apiCustomerOrdersOrderIdpaymentMethodsGetCollection(orderId, page, itemsPerPage);
      paymentMethods.value = response["hydra:member"];
      return paymentMethods.value;
    } catch (error) {
      console.error("Erreur lors de la récupération des méthodes de paiement:", error);
      throw error;
    }
  };

  // Récupérer une méthode de paiement spécifique par son ID
  const fetchPaymentMethodById = async (id) => {
    try {
      const response = await $API.paymentMethod.apiCustomerPaymentMethodsIdGet({
        id,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Méthode de paiement non trouvée:", error);
      } else {
        console.error("Erreur lors de la récupération de la méthode de paiement:", error);
      }
      throw error;
    }
  };

  return {
    paymentMethods,
    fetchPaymentMethodsForOrder,
    fetchPaymentMethodById,
  };
});
