<template>
  <FALoader v-if="stripeLoading" />
  <FMFormMessage
    v-if="stripeError"
    type="error"
    :text="$t('pages.checkout.payment.error_payment')"
  />
  <form class="f-checkout-stripe" @submit.prevent="submitStripe">
    <FMFormMessage v-if="submitError" type="error" :text="submitError" />
    <div id="payment-element"></div>
    <FAButton
      v-if="!stripeLoading && !stripeError"
      :submit="true"
      :label="$t('pages.checkout.payment.bank_card.button')"
      :is-loading="submitLoading"
    />
  </form>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from "#app";
import { useAddressesStore, useCartData, useNuxtApp } from "#imports";
import {
  loadStripe,
  type Stripe,
  type StripeElements,
} from "@stripe/stripe-js";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import stripeConfig from "../../configs/stripe.config";

const addressesStore = useAddressesStore();
const { $trackingPlan } = useNuxtApp();
const { t } = useI18n();
const { clientSecret, cartOrder } = useCartData();
const router = useRouter();

const config = useRuntimeConfig();

let stripe: Stripe | null;
const stripeLoading = ref(true);
const submitLoading = ref(false);
const stripeError = ref(false);
const submitError = ref<string | boolean>(false);
let elements: StripeElements;

const submitStripe = async () => {
  const billingAddress = await addressesStore
    .fetchAddressById(cartOrder.value?.billingAddress?.split("/").pop())
    .then((res) => res);

  if (!stripe || !elements || submitLoading.value) {
    return;
  }
  submitLoading.value = true;
  try {
    const { error: errorOnSubmit } = await elements.submit();
    if (errorOnSubmit) {
      submitLoading.value = false;
      submitError.value =
        errorOnSubmit || t("pages.checkout.payment.bank_card.error");
      return;
    }
    const { error: errorOnPayment } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret.value,
      confirmParams: {
        return_url: `${config.public.faume.clientUrlSecondHand}/pages/order-success`,
        payment_method_data: {
          billing_details: {
            address: {
              line1: billingAddress.addressLine1,
              postal_code: billingAddress.zipCode,
              city: billingAddress.city,
              country: billingAddress.countryCode,
            },
          },
        },
      },
    });
    if (
      errorOnPayment.type === "card_error" ||
      errorOnPayment.type === "validation_error"
    ) {
      submitError.value =
        errorOnPayment || t("pages.checkout.payment.bank_card.error");
      return;
    }
    router.push({ name: "order-success" });
    submitLoading.value = false;
  } catch (error) {
    submitError.value = error || t("pages.checkout.payment.bank_card.error");
    submitLoading.value = false;
  }
};

onMounted(async () => {
  stripeError.value = false;
  try {
    stripe = await loadStripe(stripeConfig.publicKey);
    elements = stripe!.elements({
      clientSecret: clientSecret.value,
    });
    const paymentElement = await elements.create("payment", {
      fields: {
        billingDetails: {
          address: {
            country: "never",
            postalCode: "never",
          },
        },
      },
    });
    await paymentElement.mount("#payment-element");
    stripeLoading.value = false;
  } catch {
    stripeError.value = true;
    stripeLoading.value = false;
  }
});

// Tracking Plan
if (process.client) {
  $trackingPlan?.purchaseCompleted({
    cartValue: cartOrder.value,
  });
}
// Tracking Plan
</script>

<style lang="scss">
.f-checkout-stripe {
  .f-button {
    margin-top: var(--f-length-3);
  }
}
</style>
