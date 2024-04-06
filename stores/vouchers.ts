export const useVouchersStore = defineStore("vouchers", () => {
  const { $API } = useNuxtApp();
  const userStore = useUserStore();

  const page = ref(1);
  const itemsPerPage = ref(10);
  const vouchers = ref<any[] | null>(null);
  const voucher = ref<object | null>(null);

  //giftCard --> use same name as in the API, getGiftCard Same for the file name GiftCard.ts

  const getVouchers = async () => {
    try {
      const response = await $API.giftCard.apiCustomerGiftCardsGetCollection(page.value, itemsPerPage.value);
      vouchers.value = response["hydra:member"] || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des vouchers:", error);
      if (!vouchers.value) {
        vouchers.value = [];
      }
    }
  };

  const createVoucher = async (formData) => {
    try {
      const response = await $API.giftCard.apiCustomerGiftCardsPost({
        ...formData,
      });
      const newVoucher = {
        ...response,
        ...formData,
      };
      voucher.value = newVoucher;
      await userStore.fetchCurrentUser();
      return newVoucher;
    } catch (error) {
      console.error("Erreur lors de la création d'une carte cadeau", error);
      throw error;
    }
  };

  const getVoucher = async (id) => {
    if (!id) {
      return null;
    }
    try {
      if (voucher.value && voucher.value.id === id) {
        return voucher.value;
      }
      const response = await $API.giftCard.apiCustomerGiftCardsIdGet(id);
      voucher.value = response;
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération d'un voucher:", error);
      throw error;
    }
  };

  return {
    vouchers,
    getVouchers,
    page,
    itemsPerPage,
    createVoucher,
    getVoucher,
  };
});
