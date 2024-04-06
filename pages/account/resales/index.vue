<template>
  <FTAccount name="resales">
    <FOAccountResales :resales="resales" />
  </FTAccount>
</template>

<script lang="ts" setup>
const tradeInCart = useTradeInCartStore();

const resales = computed(() => tradeInCart.tradeInCarts);

useAsyncData("tradeInCart", async () => {
  if (!resales.value?.length) {
    await tradeInCart.fetchTradeInCarts();
  }
});
</script>
