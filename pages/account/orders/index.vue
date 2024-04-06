<template>
  <FTAccount name="orders">
    <FOAccountOrders :orders="orders" />
  </FTAccount>
</template>

<script lang="ts" setup>
const ordersStore = useOrdersStore();

const orders = computed(() => ordersStore.orders);

useAsyncData("ordersData", async () => {
  if (!orders.value?.length) {
    await ordersStore.fetchOrders();
  }
});
</script>
