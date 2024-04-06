<template>
  <div class="f-account-orders">
    <FMAccountHeading :title="$t('account.orders.title')" />
    <FALoader v-if="!orders" size="l" />
    <FAText v-else-if="!orders?.length" :text="$t('account.orders.empty')" />
    <FMAccountList v-else-if="orders" :items="orders" name="order" />
    <FMPagination v-if="orders?.length && pagination" v-bind="pagination" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  orders?: any[];
  pagination?: Object;
}>();
</script>
