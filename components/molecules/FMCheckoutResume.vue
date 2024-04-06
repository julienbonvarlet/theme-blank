<template>
  <div class="f-checkout-resume" v-bind="attrs">
    <FATitle :title="$t('pages.checkout.resume.title')" size="s" />
    <div class="f-checkout-resume__container">
      <div class="f-checkout-resume__products">
        <FMCartItem v-for="item in cartItems" :key="item" :item="item" />
      </div>
      <FMPromotionalCodeInput />
      <FMCartResume v-bind="cartResumeData" />
    </div>
    <FMSmallReassurance :items="reassurance" />
  </div>
</template>

<script setup lang="ts">
const { $trackingPlan } = useNuxtApp();
const { t } = useI18n();
const { formatPrice } = usePriceFormatter();
const cartStore = useCartStore();

const { cartItems, shippingTotal, shippingDelay, discountTotal, total, subtotal, totalFormatted, shippingMethod } = useCartData();

const reassurance = computed(() => [
  {
    icon: "shipping",
    text: t("pages.checkout.resume.reassurance.1"),
  },
  {
    icon: "time",
    text: t("pages.checkout.resume.reassurance.2"),
  },
  {
    icon: "gift-card",
    text: t("pages.checkout.resume.reassurance.3"),
  },
]);

const cartResumeData = computed(() => ({
  subtotal: subtotal.value,
  total: total.value,
  shippingMethod: shippingMethod.value?.name,
  shippingDelay: shippingDelay.value,
  shippingTotal: shippingTotal.value,
  discountTotal: discountTotal.value,
}));

const attrs = useAttrs();

// Tracking Plan //
watch(subtotal, (newSubTotal) => {
  if (process.client) {
    $trackingPlan?.purchaseCheckoutStarted(newSubTotal);
  }
});
// Tracking Plan //
</script>

<style lang="scss">
.f-checkout-resume {
  @include media(">tablet") {
    width: 350px;
    flex-shrink: 0;
    margin-left: var(--f-length-5);
    position: sticky;
    top: calc(var(--f-header-height) + var(--f-length-2));
  }

  &__container {
    background-color: var(--f-color-background-light);
    padding: var(--f-length-4);
    margin: var(--f-length-2) 0;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-1);
  }

  .f-title.is-s {
    margin-bottom: var(--f-length-2);
  }

  .f-cart-item__actions {
    display: none;
  }

  .f-cart-resume {
    margin-top: var(--f-length-3);
  }

  .f-promo-code-input {
    margin: var(--f-length-3) 0;
  }
}
</style>
