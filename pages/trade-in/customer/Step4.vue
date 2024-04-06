<template>
  <FTTradeIn class="f-ti-customer-4">
    <FMTradeInStep v-if="cart" :title="$t('trade_in.customer_final.title')">
      <FMResaleShippingExplanation :resale="cart" />
    </FMTradeInStep>

    <FMSectionContainer
      v-if="cart"
      class="f-ti-voucher"
      class-child="f-ti-voucher__inner"
      max-width="m"
      :padding-x="true"
      :padding-y="true"
      :margin-y="true"
    >
      <FATradeInTitle
        :title="$t('trade_in.customer_final.voucher.title')"
        size="s"
      />
      <FAText :text="$t('trade_in.customer_final.voucher.text')" />
      <FMCtaContainer v-bind="ctaContainerData" />
    </FMSectionContainer>
  </FTTradeIn>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const tradeInModule = useTradeInModule();
const { $trackingPlan } = useNuxtApp();

const cart = computed(() => tradeInModule.cart);

const ctaContainerData = {
  link1: {
    title: t("trade_in.customer_final.voucher.button_home"),
    url: "/",
    icon: "house",
  },
  link2: {
    title: t("trade_in.customer_final.voucher.button_account"),
    url: "/account",
    icon: "right",
  },
};

// Tracking Plan //
const total = computed(() => {
  if (tradeInModule.cart?.items && Array.isArray(tradeInModule.cart.items)) {
    return (
      tradeInModule.cart.total ||
      tradeInModule.cart.items.reduce(
        (total, item) => total + item.priceResale,
        0,
      )
    );
  }
  return 0;
});

if (process.client) {
  $trackingPlan?.tradeinCompleted(total.value);
}
</script>

<style lang="scss">
.f-ti-voucher {
  background-color: var(--f-color-background-light);
  text-align: center;

  .f-title {
    text-align: center;
    border: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-4);
  }

  .f-cta-container {
    margin: auto;
    justify-content: center;
    align-items: center;
  }
}
</style>
