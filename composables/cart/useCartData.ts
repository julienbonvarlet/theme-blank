import { computed } from "vue";
import {
  useCartStore,
  usePriceFormatter,
  useAddressesStore,
  useShippingMethodsStore,
} from "#imports";

export function useCartData() {
  const cartStore = useCartStore();
  const addressesStore = useAddressesStore();
  const shippingMethodsStore = useShippingMethodsStore();
  const { formatPrice } = usePriceFormatter();

  const shippingMethods = computed(() => shippingMethodsStore.shippingMethods);

  const paymentMethod = computed(() => cartStore.cartOrder?.paymentMethod);
  const clientSecret = computed(
    () => cartStore.cartOrder?.stateContext?.[0]?.payment_intent?.client_secret,
  );

  const cartId = computed(() => cartStore.cartId);
  const cartOrder = computed(() => cartStore.cartOrder);
  const cartItems = computed(() => cartStore.cartItems);
  const cartCount = computed(() => cartItems.value?.length);
  const isCartEmpty = computed(() => !cartItems.value?.length);

  const shippingMethodId = computed(() => cartOrder.value?.shippingMethod);
  const shippingMethod = computed(() =>
    shippingMethodId.value && shippingMethods.value?.length
      ? shippingMethods.value.find((x) => x["@id"] === shippingMethodId.value)
      : null,
  );
  const shippingMethodName = computed(() => shippingMethod.value?.name);
  const shippingDelay = computed(() => shippingMethod.value?.comment);
  const shippingTotal = computed(() => cartOrder.value?.shippingTotal);
  const amountForFreeShipping = computed(() => cartStore.amountForFreeShipping);

  const promoCode = computed(() => cartOrder.value?.promoCode);
  const discountTotal = computed(() => cartOrder.value?.discountTotal);

  const subtotal = computed(() => cartOrder.value?.itemsTotal);
  const subtotalFormatted = computed(() => formatPrice(subtotal.value));

  const total = computed(() => cartOrder.value?.total);
  const totalFormatted = computed(() => formatPrice(total.value));

  const isMiniCartOpen = computed(() => cartStore.isMiniCartOpen);

  const shippingAddress = computed(() =>
    addressesStore.addresses?.find(
      (x) => x["@id"] === cartOrder.value?.shippingAddress,
    ),
  );
  const billingAddress = computed(() =>
    addressesStore.addresses?.find(
      (x) => x["@id"] === cartOrder.value?.billingAddress,
    ),
  );

  return {
    cartId,
    cartItems,
    cartOrder,
    cartCount,
    isCartEmpty,
    shippingMethodId,
    shippingTotal,
    promoCode,
    discountTotal,
    subtotal,
    total,
    totalFormatted,
    subtotalFormatted,
    amountForFreeShipping,
    shippingMethods,
    isMiniCartOpen,
    paymentMethod,
    billingAddress,
    shippingAddress,
    clientSecret,
    shippingMethod,
    shippingMethodName,
    shippingDelay,
  };
}
