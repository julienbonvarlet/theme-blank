<template>
  <FTAccount name="resales">
    <FOAccountResales :resales="resales" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";
import { useTradeInCartStore } from "../../../stores/TradeInCartStore";

const tradeInCart = useTradeInCartStore();

const resales = computed(() => tradeInCart.tradeInCarts);

useAsyncData("tradeInCart", async () => {
  if (!resales.value?.length) {
    await tradeInCart.fetchTradeInCarts();
  }
});
</script>
