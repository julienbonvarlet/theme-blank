<template>
  <div class="fp-cart" :class="{ 'is-empty': isCartEmpty }">
    <FOSectionText title-size="l" title-tag="h1" :title="$t('pages.cart.title')" :text="isCartEmpty && cartItems ? $t('pages.cart.empty') : null" />

    <FALoader v-if="!cartItems" class="fp-cart__loader" />

    <FMSectionContainer v-if="!isCartEmpty" class-child="fp-cart__container" :padding-x="true" max-width="l">
      <div class="fp-cart__col fp-cart__col--products">
        <FATitle size="s">{{ productCountTitle }}</FATitle>
        <FMShippingProgressBar :total="total" :amount-for-free-shipping="amountForFreeShipping" />
        <div class="fp-cart__products">
          <FMCartItem v-for="item in cartItems" :key="item.id" :item="item" />
        </div>
      </div>
      <div class="fp-cart__col fp-cart__col--resume">
        <FATitle size="s">{{ $t("pages.cart.resume") }}</FATitle>
        <div class="fp-cart__resume-container">
          <FMPromotionalCodeInput />
          <FMCartResume v-bind="cartResume" />
        </div>
        <FMSmallReassurance :items="data.reassurance" />
      </div>
    </FMSectionContainer>
    <FOProductSuggestions v-bind="selectedFiltersForSuggestions" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { selectedFiltersForSuggestions } = useCartSuggestions();

const { cartItems, isCartEmpty, shippingTotal, shippingMethodName, shippingDelay, discountTotal, total, subtotal, totalFormatted, amountForFreeShipping, cartCount } = useCartData();

const data = computed(() => {
  return {
    reassurance: [
      {
        icon: "shipping",
        text: t("pages.cart.reinsurance.1"),
      },
      {
        icon: "time",
        text: t("pages.cart.reinsurance.2"),
      },
      {
        icon: "gift-card",
        text: t("pages.cart.reinsurance.3"),
      },
    ],
  };
});

const productCountTitle = computed(() => {
  return cartCount.value > 1 ? t("pages.cart.products_count", { count: cartCount.value }) : t("pages.cart.product_count");
});

const cartResume = computed(() => ({
  subtotal: subtotal.value,
  shippingMethod: shippingMethodName.value,
  shippingDelay: shippingDelay.value,
  shippingTotal: shippingTotal.value,
  discountTotal: discountTotal.value,
  primaryButton: {
    label: t("pages.cart.checkout_button", { total: totalFormatted.value }),
    to: "/checkout",
  },
  secondaryButton: {
    label: t("pages.cart.continue_button"),
    to: "/products",
  },
}));

// Tracking Plan //
watch(total, (newTotal) => {
  if (process.client) {
    useNuxtApp().$trackingPlan?.purchaseViewCart(newTotal);
  }
});
// Tracking Plan //
</script>

<style lang="scss">
.fp-cart {
  margin-bottom: var(--f-margin-section);

  &__container {
    display: flex;
    gap: var(--f-length-4);

    @include media("<=tablet") {
      flex-direction: column;
    }
  }

  &__promotion-code {
    display: flex;
    align-items: center;
    margin-bottom: var(--f-length-3);
    gap: var(--f-length-1);
  }

  &__promotion-input {
    flex-grow: 1;
  }

  &__col {
    & > .f-title {
      margin-bottom: var(--f-length-2);
    }

    &--products {
      flex-grow: 1;
    }

    &--resume {
      @include media(">tablet") {
        width: 400px;
        flex-shrink: 0;
      }
    }
  }

  .f-product-card {
    margin-top: var(--f-length-3);
  }

  .f-small-reassurance {
    margin-top: var(--f-length-3);
  }

  &__resume-container {
    background-color: var(--f-color-background-light);
    padding: var(--f-length-3);

    .formkit-outer {
      margin: 0;
    }

    .formkit-input {
      background-color: var(--f-color-background-very-light);
    }
  }

  &__loader {
    margin: var(--f-length-5) auto;
    display: block;
  }

  .f-shipping-progress-bar {
    margin-bottom: var(--f-length-4);
  }
}
</style>
