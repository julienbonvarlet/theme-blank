<template>
  <FMCardInline class="f-order-card" v-bind="cardInlineData" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const imageStore = useImageStore();
const { toUnixTimestamp, formatDate } = useDateFormatter();
const { getPhotoFromOrder } = useGetOrderPhoto();

const props = withDefaults(
  defineProps<{
    order: object;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
  },
);

const image = ref<null | string>(null);

const count = computed(() => props.order?.items?.length || 0);
const date = computed(() => {
  if (props.order.createdAt) {
    return formatDate(props.order.createdAt);
  }
  const date = props.order?.stateContext?.payment_intent?.created;
  if (date) {
    return toUnixTimestamp(date);
  }
  return null;
});

const cardInlineData = computed(() => {
  const order = props.order;
  return {
    title: order.reference,
    text: count.value < 2 ? t("account.orders.product_bought", { count: count.value }) : t("account.orders.products_bought", { count: count.value }),
    details: order.date || date.value,
    price: order.total,
    image: image.value || order.photo || imageStore.placeholder,
    originalPrice: order.originalPrice,
    statusValue: order.state,
    statusText: t(`account.orders.states.${order.state}`) || order.state,
    displayOldPrice: props.displayOldPrice,
    to: `/account/orders/${order.id}`,
  };
});

watch(
  props.order,
  async (newOrder) => {
    image.value = await getPhotoFromOrder(newOrder);
  },
  { deep: true, immediate: true },
);
</script>
