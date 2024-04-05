<template>
  <FMCardInline
    class="f-ti-cart-item"
    :title="item.title || item?.medatada?.title || item.sku"
    :text="`${t('global.size')} ${item.size} • ${item.color}`"
    :description="t(`global.conditions.${item.condition}.title`)"
    :details="t('trade_in.cart.reference', { sku: item.sku })"
    :image="image"
  >
    <FAText :text="t('trade_in.cart.amount', { amount: total })" />
    <template #right>
      <FAButtonIcon icon="trash" @click.prevent="removeFromCart(item)" />
    </template>
  </FMCardInline>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePriceFormatter } from "../../composables/usePriceFormatter";
import { useImageStore } from "../../stores/imageStore";
import { useTradeInModule } from "../../stores/tradeInModule";

const { $trackingPlan } = useNuxtApp();
const { t } = useI18n();
const imageStore = useImageStore();
const { formatPrice } = usePriceFormatter();
const tradeInModule = useTradeInModule();

interface Item {
  "@context": string;
  "@id": string;
  "@type": string;
  id: string;
  reference: string;
  ean: string;
  sku: string;
  color: string;
  size: string;
  condition: string;
  title: string;
  photo: string;
  priceOrigin: number;
  priceResale: number;
  medatada: [string];
  createdAt: string;
  updatedAt: string;
}

const props = defineProps<{
  item: Item;
}>();

const photo = ref<null | string>(null);
const total = computed(() => formatPrice(props.item.priceResale));
const image = computed(
  () => props.item?.medatada?.images?.[0] || imageStore.placeholder,
);

const removeFromCart = (item) => {
  tradeInModule.removeFromCart(item.id);
  if (process.client) {
    $trackingPlan?.tradeinRemoveFromCart(item.priceResale);
  }
};
</script>

<style lang="scss">
.f-ti-cart-item {
  .f-button-icon {
    align-self: flex-start;
    margin-left: auto;
    flex-shrink: 0;
  }

  .f-text.is-m {
    margin-top: var(--f-length-1);
  }
}
</style>
