import type { WalletTransaction_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useWalletTransactionStore = defineStore("wallet-transaction", () => {
  const { $getCollection, $get } = useNuxtApp();
  const walletTransactions = ref<WalletTransaction_jsonld[]>([]);

  const fetchWalletTransactions = async (page = 1, itemsPerPage = 10) => {
    const { items } = await $getCollection<ApiCollection<WalletTransaction_jsonld>>(`/api/v3/customer/wallet-transactions?page=${page}&itemsPerPage=${itemsPerPage}`);
    walletTransactions.value = items;

    return walletTransactions.value;
  };

  const fetchWalletTransactionById = async (walletTransactionId: string) => {
    return await $get<WalletTransaction_jsonld>(`/api/v3/customer/wallet-transactions/${walletTransactionId}`);
  };

  return {
    walletTransactions,
    fetchWalletTransactions,
    fetchWalletTransactionById,
  };
});
