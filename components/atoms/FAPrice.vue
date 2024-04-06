<template>
  <span class="f-price" :class="[sizeClass, oldClass]">
    {{ formattedPrice }}
  </span>
</template>

<script setup lang="ts">
const { formatPrice, formatPriceWithoutCents } = usePriceFormatter();

const props = withDefaults(
  defineProps<{
    price: number;
    size?: (typeof PriceSizes)[string];
    old?: boolean;
    cents?: boolean;
  }>(),
  {
    size: "s",
    cents: true,
  }
);

const sizeClass = computed(() => `is-${props.size}`);
const oldClass = computed(() => (props.old ? "is-old" : null));
const formattedPrice = computed(() =>
  props.cents ? formatPrice(props.price) : formatPriceWithoutCents(props.price)
);
</script>

<style lang="scss">
.f-price {
  font-family: var(--price-font-family);
  font-weight: var(--price-font-weight);
  font-size: var(--price-s-font-size);

  &.is-m {
    font-size: var(--price-m-font-size);
  }

  &.is-l {
    font-size: var(--price-l-sm-font-size);

    @include media(">=tablet", "<desktop") {
      font-size: var(--price-l-md-font-size);
    }

    @include media(">=desktop") {
      font-size: var(--price-l-lg-font-size);
    }
  }

  &.is-old {
    text-decoration: line-through;
    color: var(--price-old-color);
    font-weight: var(--price-old-font-weight);
  }
}
</style>
