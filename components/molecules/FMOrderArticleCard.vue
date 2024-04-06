<template>
  <FMCardInline class="f-order-article-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const imageStore = useImageStore();
const { $API } = useNuxtApp();

const props = withDefaults(
  defineProps<{
    article: object;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const articleChoice = ref<null | {}>(null);
const articleChoiceId = computed(() =>
  props.article?.articleChoice?.split("/")?.pop(),
);

const cardInlineData = computed(() => {
  const article = props.article;
  const articleProps = article.productName.split(", ");
  return {
    title: articleChoice.value?.metadata?.title || articleProps[0],
    text: articleProps.slice(1).join(" • "),
    details: t("account.orders.detail.id", { id: article.id }),
    image:
      articleChoice.value?.photos?.[0] ||
      article.photo ||
      imageStore.placeholder,
    price: article.total,
    originalPrice: articleChoice.value?.originPrice || article.unitPric,
    statusValue: article.statusValue,
    statusText: article.statusText,
    displayOldPrice: props.displayOldPrice,
  };
});

watch(
  articleChoiceId,
  async (id) => {
    if (id) {
      articleChoice.value =
        await $API.articleChoice.apiCustomerArticleChoicesIdGet(id);
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
