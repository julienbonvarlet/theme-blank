<template>
  <FMCardInline class="f-order-article-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
import type { OrderItem_jsonld, TradeIn_jsonld_trade_in_read_trade_in_read_detail } from "@faume-tech/sdk-recommerce";

const { $get } = useNuxtApp();

const { t } = useI18n();
const imageStore = useImageStore();

const props = withDefaults(
  defineProps<{
    article: OrderItem_jsonld;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const tradeIn = ref<TradeIn_jsonld_trade_in_read_trade_in_read_detail | null>(null);

const cardInlineData = computed(() => {
  const article = props.article;
  const articleProps = article.productName!.split(", ");
  return {
    title: tradeIn.value?.metadata?.title || articleProps[0],
    text: articleProps.slice(1).join(" • "),
    details: t("account.orders.detail.id", { id: article.id }),
    image: tradeIn.value!.metadata!.photos?.[0] || imageStore.placeholder,
    price: article.total,
    originalPrice: tradeIn.value!.priceOrigin || article.unitPrice,
    statusValue: article.statusValue,
    statusText: article.statusText,
    displayOldPrice: props.displayOldPrice,
  };
});

watch(
  tradeIn,
  async (id) => {
    if (id) {
      tradeIn.value = await $get<TradeIn_jsonld_trade_in_read_trade_in_read_detail>(`/api/v3/customer/trade-ins/${id}`);
    }
  },
  { deep: true, immediate: true },
);
</script>

<style lang="scss">
.f-order-article-card {
  &.f-card-inline {
    align-items: flex-start;
  }

  .f-card-text {
    margin-left: 0;
    margin-right: auto;
  }
}
</style>
