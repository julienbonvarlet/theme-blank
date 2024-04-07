<template>
  <FMTradeInStep :title="$t('trade_in.cart.title')" class="f-ti-cart" max-width="l">
    <div class="f-ti-cart__container">
      <div class="f-ti-cart__col f-ti-cart__col--products">
        <FATradeInTitle :title="listTitle" size="s" />
        <div v-if="cart?.items?.length" class="f-ti-cart__items">
          <FMTradeInCartItem v-for="item in cart.items" :key="item" :item="item" />
        </div>
        <FAButton
          class="f-ti-cart__add"
          :label="$t('trade_in.cart.button_add')"
          :to="{
            name: isStore ? 'trade-in-store-step-2' : 'trade-in-customer-step-1',
          }"
          icon="plus"
        />
      </div>
      <div class="f-ti-cart__col f-ti-cart__col--resume">
        <FATradeInTitle :title="$t('trade_in.cart.title_resume')" size="s" />
        <FMCartResume v-bind="cartResumeData">
          <FormKit v-model="cartAgree" type="checkbox" :label="$t('trade_in.cart.terms')" name="cgv" />
          <FAButton
            :is-disabled="!cartAgree"
            :label="$t('trade_in.cart.button_confirm', { total: totalFormatted })"
            :to="{
              name: isStore ? 'trade-in-store-step-4' : 'trade-in-customer-step-3',
            }"
          />
          <FAText size="xs" :text="$t('trade_in.cart.text', { total: totalFormatted })" />
        </FMCartResume>
      </div>
    </div>
  </FMTradeInStep>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { formatPrice } = usePriceFormatter();
const tradeInModule = useTradeInModule();

const emit = defineEmits(["next", "previous"]);

const cartAgree = computed({
  get: () => tradeInModule.cartAgree,
  set: (value) => tradeInModule.setCartAgree(value),
});

const cart = computed(() => tradeInModule.cart);
const count = computed(() => tradeInModule.cart?.items?.length || 0);
const total = computed(() => {
  if (tradeInModule.cart?.items && Array.isArray(tradeInModule.cart.items)) {
    return tradeInModule.cart.total || tradeInModule.cart.items.reduce((total, item) => total + item.priceResale, 0);
  }
  return 0;
});
const isStore = computed(() => cart.value?.channel !== "web");
const totalFormatted = computed(() => formatPrice(total.value || 0));
const listTitle = computed(() => {
  if (count.value > 1) {
    return t("trade_in.cart.articles_count", { count: count.value });
  }
  return t("trade_in.cart.article_count", { count: count.value });
});
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

watch(count, (value) => {
  if (!value) {
    emit("previous");
  }
});

// Tracking Plan //
if (process.client) {
  useNuxtApp().$trackingPlan?.tradeinViewCart(total.value);
}
// Tracking Plan //
</script>

<style lang="scss">
.f-ti-cart {
  $self: &;

  &__container {
    display: flex;
    gap: var(--f-length-4);
    text-align: left;
    align-items: flex-start;

    @include media("<=tablet") {
      flex-direction: column;
    }
  }

  &__col {
    &--products {
      flex-grow: 1;
      width: 100%;

      @include media(">tablet") {
        padding-top: var(--f-length-4);
      }
    }

    &--resume {
      @include media(">tablet") {
        width: 300px;
        flex-shrink: 0;
        background-color: var(--f-color-background-light);
        padding: var(--f-length-4);
      }

      @include media(">=desktop") {
        width: 400px;
      }
    }
  }

  .f-ti-cart-item {
    margin-top: var(--f-length-1);
  }

  .f-cart-resume {
    .formkit-outer {
      margin: 0;
      border-top: solid 1px var(--f-color-border);
      padding-top: var(--f-length-2);
    }

    @include media("<=tablet") {
      gap: var(--f-length-4);
    }
  }

  #{$self}__add {
    margin: var(--f-length-3) 0 0;
  }
}
</style>
