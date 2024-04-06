export const useWalletStore = defineStore("wallet", () => {
  const { $API } = useNuxtApp();
  const wallets = ref([]);

  // Récupérer la collection des portefeuilles
  const fetchWallets = async (page = 1, itemsPerPage = 10) => {
    try {
      const response = await $API.wallet.apiCustomerWalletsGetCollection({
        page,
        itemsPerPage,
      });
      wallets.value = response["hydra:member"];
      return wallets.value;
    } catch (error) {
      console.error("Erreur lors de la récupération des portefeuilles:", error);
      throw error;
    }
  };

  return {
    wallets,
    fetchWallets,
  };
});
