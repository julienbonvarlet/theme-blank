<template>
  <FMCardInline class="f-resale-article-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const imageStore = useImageStore();

const props = withDefaults(
  defineProps<{
    article: object;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const getDescription = (article) => {
  let text = `${t("account.trade_ins.declared_condition")} ${t(`global.conditions.${article.condition}.title`) | article.condition}`;
  if (article.controlReview) {
    text += `<br>${t("account.trade_ins.reviewed_condition")} ${t(`global.conditions.${article.controlReview}.title`) | article.controlReview}`;
  }
  return text;
};

const cardInlineData = computed(() => {
  const article = props.article;
  return {
    title: article?.medatada?.title || article.title || article.sku,
    text: `${t("global.size")} ${article.size} • ${article.color}`,
    description: getDescription(article),
    details: `${t("global.id")} ${article.id}`,
    price: article.priceResale,
    image: article?.medatada?.images?.[0] || imageStore.placeholder,
    statusValue: article.warehouseStage,
    statusText: t(`account.trade_ins.status.${article.warehouseStage}`) || article.warehouseStage,
  };
});
</script>
