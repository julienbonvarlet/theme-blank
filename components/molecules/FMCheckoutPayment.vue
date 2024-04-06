<template>
  <div class="f-checkout-payment">
    <FATitle size="s" :title="$t('pages.checkout.payment.title')" />
    <FMFormMessage v-if="errorPayment" type="error" :text="$t('pages.checkout.identification.error_payment')" />
    <FALoader v-if="loading" />
    <ul v-else-if="paymentMethods?.length">
      <FMRadioInline v-for="method in paymentMethods" :key="method" :title="method.name" :icon="method.code" :checked="paymentMethod === method['@id']" @click="setPaymentMethod(method['@id'])">
        <FMCheckoutStripe v-if="displayStripe && method.code === 'card'" />
      </FMRadioInline>
    </ul>
    <FMFormMessage v-else type="error" :text="$t('pages.checkout.payment.error_payments')" />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const cartStore = useCartStore();
const paymentMethodsStore = usePaymentMethodsStore();

const { cartId, billingAddress } = useCartData();
const paymentMethods = computed(() => paymentMethodsStore.paymentMethods);
const paymentMethodType = computed(() => paymentMethods.value?.find((x) => x["@id"] === paymentMethod.value)?.code);
const loading = ref(true);
const errorPayment = ref(false);
const paymentMethod = ref<null | string>(null);
const displayStripe = ref(false);

const setPaymentMethod = async (id) => {
  paymentMethod.value = id;
  if (id !== paymentMethod.value) {
    errorPayment.value = false;
    try {
      await cartStore.updateOrder({
        paymentMethod: id,
      });
    } catch {
      errorPayment.value = true;
    }
  }
};

const displayPaymentInterface = () => {
  displayStripe.value = false;
  const type = paymentMethodType.value;
  switch (type) {
    case "card":
      displayStripe.value = true;
      break;
    default:
      alert("Ce moyen de paiement sera bientôt disponible : " + type);
  }
};

watch(paymentMethod, async () => {
  await cartStore.updateOrder({ paymentMethod: paymentMethod.value });
  displayPaymentInterface();
});

onMounted(async () => {
  if (paymentMethods.value?.length) {
    loading.value = false;
  } else {
    await paymentMethodsStore.fetchPaymentMethodsForOrder(cartId.value);
    loading.value = false;
  }
});
</script>
