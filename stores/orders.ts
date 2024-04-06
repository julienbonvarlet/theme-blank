export const useOrdersStore = defineStore("orders", () => {
  const { $API } = useNuxtApp();

  const page = ref(1);
  const itemsPerPage = ref(10);
  const orders = ref<any[] | null>(null);

  // Ajouter un article dans une commande
  const addOrderItem = async (orderUrl, articleChoiceUrl) => {
    try {
      const response = await $API.orderItem.apiCustomerOrderItemsPost({
        order: orderUrl,
        tradeIn: articleChoiceUrl,
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un article dans une commande:", error);
      throw error;
    }
  };

  // Récupérer un article de commande par son ID
  const getOrderItemById = async (id) => {
    try {
      const response = await $API.orderItem.apiCustomerOrderItemsIdGet(id);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération d'un article de commande:", error);
      throw error;
    }
  };

  // Supprimer un article de commande
  const deleteOrderItem = async (id) => {
    try {
      await $API.orderItem.apiCustomerOrderItemsIdDelete(id);
      console.log("Article supprimé de la commande avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression d'un article de commande:", error);
      throw error;
    }
  };

  // Récupérer la collection des commandes
  const fetchOrders = async () => {
    try {
      const response = await $API.order.apiCustomerOrdersGetCollection(page.value, itemsPerPage.value);
      orders.value = response["hydra:member"] || [];
      return orders.value;
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      orders.value = [];
      throw error;
    }
  };

  // Créer une nouvelle commande
  const createOrder = async (orderData) => {
    try {
      const response = await $API.order.apiCustomerOrdersPost(orderData);
      return response;
    } catch (error) {
      console.error("Erreur lors de la création d'une commande:", error);
      throw error;
    }
  };

  // Récupérer une commande par ID
  const getOrderById = async (id) => {
    try {
      const response = await $API.order.apiCustomerOrdersIdGet(id);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération d'une commande:", error);
      throw error;
    }
  };

  // Supprimer une commande
  const deleteOrder = async (id) => {
    try {
      await $API.order.apiCustomerOrdersIdDelete({ id });
      console.log("Commande supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression d'une commande:", error);
      throw error;
    }
  };

  // Mettre à jour une commande
  const updateOrder = async (id, updatedData) => {
    try {
      const response = await $API.order.apiCustomerOrdersIdPatch(id, updatedData);
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande:", error);
      throw error;
    }
  };

  // Récupérer la collection des points de dépôt pour une commande spécifique
  const fetchDropoffPoints = async (orderId, page = 1, itemsPerPage = 10) => {
    try {
      const response = await $API.order.apiCustomerOrdersIddropoffpointsGetCollection({
        id: orderId,
        page,
        itemsPerPage,
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des points de dépôt pour une commande:", error);
      throw error;
    }
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
