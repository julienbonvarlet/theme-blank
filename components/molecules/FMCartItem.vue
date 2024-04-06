<template>
  <FMCardInline class="f-cart-item" :image="photo" :title="title" :text="text">
    <FMPriceContainer
      :price="item.total"
      :original-price="article.originPrice"
      size="s"
    />
    <div class="f-cart-item__reductions">
      <FADiscountTag
        :sale-price="item.total"
        :original-price="article.originPrice"
      />
      <FADiscountTag v-if="false" :promotional-offer="true" />
    </div>
    <template #right>
      <div class="f-cart-item__actions">
        <FAButtonIcon v-if="false" icon="write" />
        <FAButtonIcon
          icon="cross"
          :is-loading="loading"
          @click.prevent="removeFromCart"
        />
      </div>
    </template>
  </FMCardInline>
</template>

<script setup lang="ts">
const { $trackingPlan } = useNuxtApp();
const cartStore = useCartStore();

const props = defineProps<{
  item: Object;
}>();

const loading = ref(false);

const article = computed(() => props.item?.article);
const title = computed(() => props.item.article?.metadata?.title);
const text = computed(() =>
  [
    props.item.article?.size,
    props.item.article?.color,
    props.item.article?.state,
  ].join(" • "),
);
const photo = computed(() => article.value?.photos?.[0]);

const removeFromCart = async () => {
  loading.value = true;
  cartStore.removeFromCart(props.item.id).then((loading.value = false));
  // Tracking Plan //
  if (process.client) {
    $trackingPlan?.purchaseRemoveFromCart({
      product: props.item,
      cartValue: cartStore.cartOrder?.itemsTotal,
    });
  }
  // Tracking Plan //
};
</script>

<style lang="scss">
.f-cart-item {
  &__reductions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--f-length-1);
    margin-top: var(--f-length-1);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--f-length-1);
    align-self: flex-start;
    margin-left: auto;
  }

  .f-price-container {
    justify-content: flex-start;
  }
}
</style>
