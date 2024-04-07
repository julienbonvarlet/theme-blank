export const useVouchersStore = defineStore("voucher", () => {
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
      if (!vouchers.value) {
        vouchers.value = [];
      }
    }
  };

  const createVoucher = async (formData) => {
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
  };

  const getVoucher = async (id) => {
    if (!id) {
      return null;
    }
    if (voucher.value && voucher.value.id === id) {
      return voucher.value;
    }
    const response = await $API.giftCard.apiCustomerGiftCardsIdGet(id);
    voucher.value = response;
    return response;
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
