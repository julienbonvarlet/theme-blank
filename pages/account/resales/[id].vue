<template>
  <FTAccount name="resale">
    <FALoader v-if="pending" />
    <FOAccountResale v-else-if="resale" :resale="resale" />
    <FMFormMessage v-else type="error" :text="$t('account.trade_ins.error')" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useAsyncData } from "nuxt/app";
import { useTradeInCartStore } from "../../../stores/TradeInCartStore";
import { useRoute } from "vue-router";

const tradeInCart = useTradeInCartStore();
const route = useRoute();

const id = ref(route.params.id);

const {
  data: resale,
  pending,
  error,
} = useAsyncData(`tradeInCart-${id.value}`, () => {
  return tradeInCart.fetchTradeInCart(id.value);
});
</script>
