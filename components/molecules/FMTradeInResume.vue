<template>
  <div class="f-ti-resume" v-bind="attrs">
    <FATradeInTitle :title="$t('trade_in.cart.title')" size="s" />
    <div class="f-ti-resume__container">
      <div class="f-ti-resume__products">
        <FMTradeInCartItem
          v-for="item in cart.items"
          :key="item"
          :item="item"
        />
      </div>
      <FMCartResume v-bind="cartResumeData" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { formatPrice } = usePriceFormatter();
const tradeInModule = useTradeInModule();

const cart = computed(() => tradeInModule.cart);
const total = computed(() => {
  if (tradeInModule.cart?.items && Array.isArray(tradeInModule.cart.items)) {
    return (
      tradeInModule.cart.total ||
      tradeInModule.cart.items.reduce(
        (total, item) => total + item.priceResale,
        0
      )
    );
  }
  return 0;
});
const totalFormatted = computed(() => formatPrice(total.value || 0));
const cartResumeData = computed(() => {
  const lines =
    cart.value?.items?.map((item) => ({
      label: item.title || item?.medatada?.title || item.sku,
      value: formatPrice(item.priceResale),
    })) || [];
  lines.push({
    label: t("trade_in.cart.offer"),
    value: totalFormatted.value,
    bold: true,
  });
  return { lines };
});

const attrs = useAttrs();
</script>

<style lang="scss">
.f-ti-resume {
  @include media(">desktop") {
    width: 350px;
    flex-shrink: 0;
    margin-left: var(--f-length-5);
    position: sticky;
    z-index: var(--z-index-above);
    top: var(--f-header-height);
  }

  @include media("<=desktop") {
    display: none;
  }

  &__container {
    background-color: var(--f-color-background-light);
    padding: var(--f-length-4);
  }

  &__products {
    margin-bottom: var(--f-length-3);

    & > * {
      margin-bottom: var(--f-length-2);
    }
  }

  .f-cart-resume {
    .formkit-outer {
      margin: 0;
      border-top: solid 1px var(--f-color-border);
      padding-top: var(--f-length-2);
    }
  }

  .f-card-inline {
    .f-text.is-m,
    .f-button-icon {
      display: none;
    }
  }
  tr:last-of-type {
    .f-text {
      font-size: var(--f-text-m-font-size);
      margin-top: var(--f-length-2);
      padding-top: var(--f-length-2);
      border-top: solid 1px var(--f-color-border);
    }
  }
}
</style>
