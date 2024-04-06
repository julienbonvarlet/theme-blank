export const useShippingMethodsStore = defineStore("shippingMethods", () => {
  const { $API } = useNuxtApp();
  const shippingMethods = ref(null);

  // Récupérer la collection des méthodes de livraison pour une commande spécifique
  const fetchShippingMethodsForOrder = async (orderId) => {
    try {
      const response =
        await $API.shippingMethod.apiCustomerOrdersOrderIdshippingMethodsGetCollection(
          orderId,
        );
      shippingMethods.value = response["hydra:member"];
      return shippingMethods.value;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des méthodes de livraison:",
        error,
      );
      throw error;
    }
  };

  // Récupérer une méthode de livraison spécifique par son ID
  const fetchShippingMethodById = async (id) => {
    try {
      const response =
        await $API.shippingMethod.apiCustomerShippingMethodsIdGet({ id });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Méthode de livraison non trouvée:", error);
      } else {
        console.error(
          "Erreur lors de la récupération de la méthode de livraison:",
          error,
        );
      }
      throw error;
    }
  };

  return {
    shippingMethods,
    fetchShippingMethodsForOrder,
    fetchShippingMethodById,
  };
});
