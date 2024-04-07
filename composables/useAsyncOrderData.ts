export function useAsyncOrderData(apiConfig: any = {}, order: any) {
  const billingAddress = ref<null | object>(null);
  const shippingAddress = ref<null | object>(null);
  const shippingMethod = ref<null | object>(null);
  const promotionalCode = ref<null | object>(null);

  const loadData = async () => {
    if (order.billingAddress) {
      billingAddress.value = await fetchData(order.billingAddress, apiConfig);
    }
    if (order.shippingAddress) {
      shippingAddress.value = await fetchData(order.shippingAddress, apiConfig);
    }
    if (order.shippingMethod) {
      shippingMethod.value = await fetchData(order.shippingMethod, apiConfig);
    }
    if (order.promoCode) {
      promotionalCode.value = await fetchData(order.promoCode, apiConfig);
    }
  };

  loadData();

  return { billingAddress, shippingAddress, shippingMethod, promotionalCode };
}
