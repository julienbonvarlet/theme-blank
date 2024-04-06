<template>
  <FMPopin
    :title="$t('sections.minicart.title')"
    position="right"
    extra-class="f-minicart"
    :visible="isMiniCartOpen"
    @on-close="close"
  >
    <FALoader v-if="!cartItems" />

    <div v-if="isCartEmpty && cartItems" class="f-minicart__empty">
      <FAText :text="$t('sections.minicart.empty')" />
      <FAButton :label="$t('sections.minicart.empty_cta')" to="/products" />
    </div>

    <FMShippingProgressBar
      v-if="!isCartEmpty"
      :total="total"
      :amount-for-free-shipping="amountForFreeShipping"
    />

    <div v-if="!isCartEmpty" class="f-minicart__products">
      <FMCartItem v-for="item in cartItems" :key="item.id" :item="item" />
    </div>

    <FOProductSuggestions
      title-size="xs"
      v-bind="selectedFiltersForSuggestions"
    />

    <template v-if="!isCartEmpty" #bottom>
      <div class="f-minicart__bottom">
        <FMPromotionalCodeInput />
        <FMCartResume v-bind="cartResume" />
      </div>
    </template>
  </FMPopin>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const cartStore = useCartStore();
const { selectedFiltersForSuggestions } = useCartSuggestions();

const {
  cartItems,
  isMiniCartOpen,
  shippingTotal,
  subtotal,
  total,
  totalFormatted,
  isCartEmpty,
  amountForFreeShipping,
  discountTotal,
  shippingMethodName,
  shippingDelay,
} = useCartData();

const cartResume = computed(() => ({
  subtotal: subtotal.value,
  shippingMethod: shippingMethodName.value,
  shippingDelay: shippingDelay.value,
  shippingTotal: shippingTotal.value,
  discountTotal: discountTotal.value,
  primaryButton: {
    label: t("sections.minicart.checkout_button", {
      total: totalFormatted.value,
    }),
    to: "/cart",
    onClick: close,
  },
  secondaryButton: {
    label: t("sections.minicart.continue_button"),
    to: "/products",
    onClick: close,
  },
}));

const close = () => {
  cartStore.toggleMiniCart();
};
</script>

<style lang="scss">
.f-minicart {
  .f-cart-resume {
    &__continue {
      --button-background: var(--f-color-background-light);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: var(--f-length-3);
    min-height: 200px;
    align-items: center;
  }

  .f-popin {
    &__heading {
      .f-title {
        padding-left: 40px;
        text-align: center;
        flex-grow: 1;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    &__content {
      background-color: var(--f-color-background-light);
      padding-top: var(--f-popin-padding-y);
    }
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-1);
  }

  &__bottom {
    padding: var(--f-popin-padding-y) var(--f-popin-padding-x);
    position: sticky;
    bottom: 0;
    z-index: var(--z-index-above);
    background-color: var(--f-color-background-very-light);
  }

  .f-product-suggestions {
    margin: var(--f-length-3) 0;
    padding: 0;

    & > * {
      padding: 0;
      margin: 0;
    }

    .f-carousel-container__heading {
      margin-bottom: var(--f-length-2);
      flex-direction: column;
      gap: var(--f-length-1);
    }

    .f-carousel {
      --items-visible: 2.2;
      --gap: var(--f-length-1);

      &__inner {
        width: calc(100% + var(--f-popin-padding-x));
      }
    }
  }
}
</style>
