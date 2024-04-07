<template>
  <FTTradeIn>
    <FMTradeInStep v-if="!agree" :title="$t('trade_in.criteria.title')" :subtitle="$t('trade_in.criteria.text')">
      <FAButton :label="$t('trade_in.criteria.button')" @click.prevent="tradeInModule.setAgree(true)" />
    </FMTradeInStep>

    <FMTradeInProductForm v-else @next="next" />
  </FTTradeIn>
</template>

<script lang="ts" setup>
const tradeInModule = useTradeInModule();

const agree = computed(() => tradeInModule.agree);
const cart = computed(() => tradeInModule.cart);

const next = () => {
  navigateTo("/trade-in/customer/Step2");
};

onMounted(() => {
  if (cart.value?.validatedAt) {
    tradeInModule.reset();
  }
});

// Tracking Plan //
if (process.client) {
  useNuxtApp().$trackingPlan?.tradeinViewCondition();
}
// Tracking Plan //
</script>
