import type { GiftCard_GiftCardInput_jsonld, GiftCard_jsonld } from "@faume-tech/sdk-recommerce";
import type { ApiCollection } from "~/types/types";

export const useGiftCardStore = defineStore("gift-card", () => {
  const giftCards = ref<GiftCard_jsonld[] | null>(null);
  const giftCard = ref<GiftCard_jsonld | null>(null);

  const getGiftCards = async (page = 1, itemsPerPage = 10) => {
    try {
      const response = await useNuxtApp().$getCollection<ApiCollection<GiftCard_jsonld>>(`/api/v3/customer/gift-cards?page=${page}&itemsPerPage=${itemsPerPage}`);
      giftCards.value = response.items;
    } catch (error) {
      if (!giftCards.value) {
        giftCards.value = [];
      }
    }
  };

  const getGiftCard = async (giftCardId: string) => {
    if (!giftCardId) {
      return null;
    }
    if (giftCard.value && giftCard.value.id === giftCardId) {
      return giftCard.value;
    }
    const response = await useNuxtApp().$get<GiftCard_jsonld>(`/api/v3/customer/gift-cards/${giftCardId}`);
    giftCard.value = response;

    return response;
  };

  const createGiftCard = async (formData: GiftCard_GiftCardInput_jsonld) => {
    const response = await useNuxtApp().$post("/api/v3/customer/gift-cards", { body: formData });
    const newGiftCard = {
      ...response,
      ...formData,
    };
    giftCard.value = newGiftCard;
    return newGiftCard;
  };

  return {
    giftCards,
    getGiftCards,
    getGiftCard,
    createGiftCard,
  };
});
