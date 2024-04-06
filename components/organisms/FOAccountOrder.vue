<template>
  <FOAccountDetail
    v-if="order"
    :title="t('account.orders.title', { id: props.order.id })"
    :timeline="timeline"
    back-url="/account/orders"
    :order-articles="items"
    :information-table="informationTable"
    :shipping-address="shippingAddress"
    :billing-address="billingAddress"
    :payment-table="paymentTable"
  >
    <template #bottom>
      <div>
        <FMAccountHeading
          :title="$t('account.orders.detail.returns.title')"
          size="s"
        >
          <FAButton
            v-if="
              !order.returnIsExpired &&
              order.returnArticles?.length !== order.articles?.length
            "
            to="/account/new-return"
            icon="plus"
            :label="$t('account.orders.detail.returns.button_new')"
          />
        </FMAccountHeading>
        <div v-if="order.returnIsExpired">
          <FAText size="s">{{
            $t("account.orders.detail.returns.expired")
          }}</FAText>
          <br />
          <FAButton
            to="pages/sell"
            :label="$t('account.orders.detail.returns.sell')"
          />
        </div>
        <FMAccountList
          v-else-if="order.returnArticles?.length"
          :items="order.returnArticles"
          name="returnArticle"
        />
        <FAText v-else>{{ $t("account.orders.detail.returns.empty") }}</FAText>
      </div>
    </template>

    <template v-if="order.shippingTrackingUrl" #shipping>
      <br />
      <FAButton
        size="s"
        icon="shipping"
        :label="$t('account.orders.track_order')"
        :to="order.shippingTrackingUrl"
      />
    </template>

    <template v-if="invoiceIsAvailable" #billing>
      <br />
      <FAButton
        size="s"
        icon="download"
        :label="$t('account.orders.download_billing')"
        :to="invoice"
      />
    </template>
  </FOAccountDetail>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  order: Object;
}>();

const wording = computed(() => {
  return {
    reference: t("global.reference"),
    order_created: t("account.orders.detail.order_created"),
    order_date: t("account.orders.detail.order_date"),
    shipping_method: t("account.orders.detail.shipping_method"),
    tracking_number: t("account.orders.detail.tracking_number"),
    promotional_code: t("account.orders.detail.promotional_code"),
    subtotal: t("global.subtotal"),
    total: t("global.total"),
    shipping: t("global.shipping"),
    article_count: t(`account.orders.detail.article_count`, {
      count: props.order.items?.length || 0,
    }),
    articles_count: t("account.orders.detail.articles_count", {
      count: props.order.items?.length || 0,
    }),
    discount: t("global.discount"),
    states: {
      shipped: t("account.orders.states.shipped"),
      delivered: t("account.orders.states.delivered"),
      return_created: t("account.orders.states.return_created"),
      return_treated: t("account.orders.states.return_treated"),
      refunded: t("account.orders.states.refunded"),
      treating: t("account.orders.states.treating"),
      requires_payment_method: t(
        "account.orders.states.requires_payment_method"
      ),
    },
  };
});

const { $API } = useNuxtApp();
const apiConfig = $API.order?.httpRequest?.config || {};

const { billingAddress, shippingAddress, shippingMethod, promotionalCode } =
  useAsyncOrderData(apiConfig, props.order);
const timeline = useOrderTimeline(props.order, wording.value);
const { items } = useAsyncOrderItems(apiConfig, props.order);
const { informationTable, paymentTable } = useOrderTables(
  props.order,
  wording.value,
  promotionalCode
);
const invoice = computed(
  () => `${apiConfig.BASE}/api/v3/customer/orders/${props.order?.id}/invoice`
);
const invoiceIsAvailable = computed(() =>
  ["traited", "refunded", "partially_refunded"].includes(props.order?.state)
);
</script>
