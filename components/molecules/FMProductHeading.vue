<template>
  <div class="f-product-heading">
    <FATitle>{{ product.title }}</FATitle>
    <div class="f-product-heading__price">
      <FMPriceContainer size="m" :price="price || product.minPrice" :original-price="product.originPrice" />
      <FADiscountTag :sale-price="product.minPrice" :original-price="product.originPrice" />
    </div>
    <FADiscountTag :promotional-offer="true" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  product: object;
  price?: number;
}>();
</script>

<style lang="scss">
.f-product-heading {
  margin-bottom: var(--f-length-3);

  .f-title {
    margin-bottom: var(--f-length-2);
  }

  &__price {
    display: flex;
    align-items: center;
    gap: var(--f-length-2);
    margin-bottom: var(--f-length-1);
  }
}
</style>
