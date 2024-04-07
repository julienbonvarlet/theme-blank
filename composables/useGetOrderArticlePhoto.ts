import type { OrderItem_jsonld } from "@faume-tech/sdk-recommerce";

export function useGetOrderPhoto() {
  const getItem = async (orderItemId: string) => {
    return await useNuxtApp().$get<OrderItem_jsonld>(`/api/v3/customer/order-items/${orderItemId}`);
  };

  const getChoice = async (id) => {
    return await $API.articleChoice.apiCustomerArticleChoicesIdGet(id);
  };

  const extractIdFromUrl = (url: string) => {
    if (!url) {
      return null;
    }
    return url.split("/").pop();
  };

  const getPhotoFromOrder = async (order: any) => {
    if (!order?.items || order.items.length === 0) {
      return null;
    }
    for (let i = 0; i < order.items.length; i++) {
      const itemUrl = order.items[i];
      if (!itemUrl) {
        continue;
      }
      const photo = await getPhotoFromOrderItemUrl(itemUrl);
      if (photo) {
        return photo;
      }
    }
    return null;
  };

  const getPhotoFromOrderItemUrl = async (url: string) => {
    const itemId = extractIdFromUrl(url["@id"]);
    if (!itemId) {
      return null;
    }
    const item = await getItem(itemId);
    return await getPhotoFromOrderItem(item);
  };

  const getPhotoFromOrderItem = async (item: {}) => {
    if (!item?.articleChoice) {
      return null;
    }
    return await getPhotoFromOrderItemChoiceUrl(item.articleChoice);
  };

  const getPhotoFromOrderItemChoiceUrl = async (url: string) => {
    const choiceId = extractIdFromUrl(url);
    if (!choiceId) {
      return null;
    }
    try {
      const choice = await getChoice(choiceId);
      return choice?.photos?.[0];
    } catch {
      return null;
    }
  };

  return {
    getPhotoFromOrder,
    getPhotoFromOrderItemUrl,
    getPhotoFromOrderItemChoiceUrl,
    getPhotoFromOrderItem,
  };
}
