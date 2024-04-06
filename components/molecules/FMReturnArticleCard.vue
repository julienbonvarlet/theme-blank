<template>
  <FMCardInline class="f-return-article-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    article: object;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const cardInlineData = computed(() => {
  const article = props.article;
  return {
    title: article.title,
    text: t("account.orders.return.reason", { reason: article.reason }),
    details: article.date,
    image: article.image,
    price: article.price,
    originalPrice: article.originalPrice,
    statusValue: article.statusValue,
    statusText: article.statusText,
    displayOldPrice: props.displayOldPrice,
  };
});
</script>
