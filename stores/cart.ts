import { useCookie, useOrdersStore, useShippingMethodsStore } from "#imports";
import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { cookiesConfig } from "../constants/cookies";

export const useCartStore = defineStore("cart", () => {
  const { $API } = useNuxtApp();

  const orderStore = useOrdersStore();
  const shippingMethodsStore = useShippingMethodsStore();

  const cartId = useCookie("faume-cart-id", cookiesConfig);
  const cartOrder = ref<null | object>(null);
  const cartItems = ref<null | any[]>(null);
  const promotionalCode = useCookie("faume-cart-code-promo", cookiesConfig);
  const isMiniCartOpen = ref(false);
  const amountForFreeShipping = 10000;

  const setDefaultShippingMethod = async () => {
    const methods = await shippingMethodsStore.fetchShippingMethodsForOrder(
      cartId.value,
    );
    console.log("methods", methods);
    const method = methods?.sort((a, b) => a.shippingCost - b.shippingCost)[0];
    if (method) {
      await updateOrder({ shippingMethod: method["@id"] });
    }
  };

  const addToCart = async (product) => {
    if (!cartOrder.value || !cartId.value) {
      const newOrder = await orderStore.createOrder({});
      cartId.value = newOrder.id;
      cartOrder.value = newOrder;
      setDefaultShippingMethod();
    }
    await orderStore.addOrderItem(cartOrder.value["@id"], product["@id"]);
    await getCart();
    await getCartItems();
    isMiniCartOpen.value = true;
  };

  const clearCart = () => {
    cartOrder.value = null;
    cartItems.value = [];
    cartId.value = null;
    promotionalCode.value = "";
  };

  const getCartItems = async () => {
    const items = [];
    for (const id of cartOrder.value?.items || []) {
      let item = await orderStore.getOrderItemById(
        id["@id"].split("/").slice(-1)[0],
      );
      const article = await $API.tradeIn.apiCustomerTradeInsIdGet(
        item.tradeIn.split("/").slice(-1)[0],
      );
      item = {
        ...item,
        article: article,
      };
      items.push(item);
    }
    cartItems.value = items;
  };

  const getCart = async () => {
    if (cartId.value) {
      cartOrder.value = await orderStore.getOrderById(cartId.value);
      if (!cartOrder.value?.items?.length) {
        clearCart();
      }
      return cartOrder;
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!cartItems.value?.length || !cartOrder.value || !cartId.value) {
      throw new Error("Aucune commande en cours");
    }
    const item = cartItems.value.find((p) => p.id === itemId);
    if (!item) {
      throw new Error("Aucun produit ne correspond à cet id : " + itemId);
    }
    await orderStore.deleteOrderItem(itemId);
    await getCart();
    if (!cartOrder.value?.items?.length) {
      clearCart();
    } else {
      await getCartItems();
    }
  };

  const toggleMiniCart = (value: boolean) => {
    isMiniCartOpen.value = value || !isMiniCartOpen.value;
  };

  const closeMiniCart = () => {
    isMiniCartOpen.value = false;
  };

  const updateOrder = async (props) => {
    if (!cartId.value) {
      throw new Error("Aucune commande n'est actuellement active.");
    }
    cartOrder.value = await orderStore.updateOrder(cartId.value, props);
    if (props.promoCode) {
      await getCartItems();
    }
    return cartOrder.value;
  };

  const updateDeliveryType = async (type: string) => {
    return updateOrder({ deliveryType: type });
  };

  const applyPromotionalCode = async (code) => {
    promotionalCode.value = code;
    return updateOrder({ promoCode: code?.trim() });
  };

  const resetPromotionalCode = () => {
    promotionalCode.value = "";
  };

  onMounted(async () => {
    if (cartId.value) {
      await getCart();
      await getCartItems();
      shippingMethodsStore.fetchShippingMethodsForOrder(cartId.value);
    } else {
      clearCart();
    }
  });

  return {
    cartId,
    cartOrder,
    cartItems,
    amountForFreeShipping,
    isMiniCartOpen,
    promotionalCode,
    addToCart,
    clearCart,
    toggleMiniCart,
    closeMiniCart,
    removeFromCart,
    applyPromotionalCode,
    getCart,
    resetPromotionalCode,
    updateOrder,
  };
});
