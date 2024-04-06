<template>
  <div v-if="items?.length" class="f-account-list">
    <component :is="compo[name]" v-for="(item, i) in items" :key="item.id || i" :article="item" :order="item" :resale="item" :voucher="item" :address="item" />
  </div>
</template>

<script lang="ts" setup>
const compo = {
  address: resolveComponent("FMAddressCard"),
  voucher: resolveComponent("FMVoucherCard"),
  order: resolveComponent("FMOrderCard"),
  orderArticle: resolveComponent("FMOrderArticleCard"),
  resaleArticle: resolveComponent("FMResaleArticleCard"),
  resale: resolveComponent("FMResaleCard"),
  returnArticles: resolveComponent("FMReturnArticlesCard"),
};

const props = defineProps<{
  items: Array;
  name: "address" | "voucher" | "order" | "resaleArticle" | "orderArticle" | "resale" | "returnArticles";
}>();
</script>

<style lang="scss">
.f-account-list {
  display: flex;
  flex-direction: column;
  gap: var(--f-length-2);
}
</style>
