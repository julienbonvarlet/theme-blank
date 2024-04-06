<template>
  <FMCardInline class="f-resale-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const { formatDate } = useDateFormatter();
const imageStore = useImageStore();
const { $API } = useNuxtApp();

const props = withDefaults(
  defineProps<{
    resale: object;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const getDescription = (resale) => {
  let text = `${t("account.trade_ins.declared_condition")} ${t(`global.conditions.${resale.declaredCondition}.title`)}`;
  if (resale.condition) {
    text += `\n${t("account.trade_ins.reviewed_condition")} ${t(`global.conditions.${resale.condition}.title`)}`;
  }
  return text;
};

const total = computed(() => {
  return (
    props.resale?.items?.reduce((total, item) => total + item.priceResale, 0) ||
    0
  );
});

const status = computed(() => props.resale?.items[0]?.warehouseStage);
const statusText = computed(() =>
  t(`account.trade_ins.status.${status.value}`),
);

const cardInlineData = computed(() => {
  const resale = props.resale;
  return {
    title: resale.reference,
    text:
      resale.items?.length > 1
        ? t("account.trade_ins.detail.articles_count", {
            count: resale.items?.length,
          })
        : t("account.trade_ins.detail.article_count", {
            count: resale.items?.length,
          }),
    description: formatDate(resale.createdAt),
    details: t(`account.trade_ins.detail.channel.${resale.channel}`),
    price: total.value,
    image:
      tradeInPhoto.value ||
      resale.photo ||
      resale.items[0]?.photos?.[0] ||
      imageStore.placeholder,
    statusValue: status.value,
    statusText: statusText.value,
    to: `/account/resales/${resale.id}`,
  };
});

const tradeInPhoto = ref<null | string>(null);
watch(
  props.resale,
  async (resale) => {
    const article = await $API.tradeInCart.apiCustomerTradeInCartsIdGet(
      resale.id,
    );
    article?.items.forEach((item) => {
      const photo =
        item?.photos?.[0] ||
        item?.medatada?.images?.[0] ||
        item?.metadata?.images?.[0];
      if (photo) {
        tradeInPhoto.value = photo;
        return;
      }
    });
  },
  { immediate: true, deep: true },
);
</script>
