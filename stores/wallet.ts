export const useWalletStore = defineStore("wallet", () => {
  const { $API } = useNuxtApp();
  const wallets = ref([]);

  const fetchWallets = async (page = 1, itemsPerPage = 10) => {
    const response = await $API.wallet.apiCustomerWalletsGetCollection({
      page,
      itemsPerPage,
    });
    wallets.value = response["hydra:member"];
    return wallets.value;
  };

  return {
    wallets,
    fetchWallets,
  };
});
