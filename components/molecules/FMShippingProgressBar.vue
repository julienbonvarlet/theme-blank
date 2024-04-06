<template>
  <div v-if="total < amountForFreeShipping" class="f-shipping-progress-bar">
    <FAText :text="text" size="s" />
    <FAProgressBar :percent="percent" />
    <div class="f-shipping-progress-bar__values">
      <FAText size="s" :text="totalFormatted" />
      <FAText size="s" :text="amountForFreeShippingFormatted" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { formatPrice } = usePriceFormatter();

const props = defineProps<{
  total: number;
  amountForFreeShipping: number;
}>();

const text = computed(() => {
  const amount = formatPrice(props.amountForFreeShipping - props.total);
  return t("promotional_offers.amount_left_free_shipping", { amount });
});

const percent = computed(
  () => (props.total / props.amountForFreeShipping) * 100,
);

const totalFormatted = computed(() => formatPrice(props.total));
const amountForFreeShippingFormatted = computed(() =>
  formatPrice(props.amountForFreeShipping),
);
</script>

<style lang="scss">
.f-shipping-progress-bar {
  &__values {
    display: flex;
    justify-content: space-between;
  }

  .f-progress-bar {
    margin: var(--f-length-1) 0;
  }

  strong {
    font-weight: 700;
  }
}
</style>
