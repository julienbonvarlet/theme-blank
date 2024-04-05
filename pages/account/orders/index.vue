<template>
  <FTAccount name="orders">
    <FOAccountOrders :orders="orders" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";
import { useOrdersStore } from "#imports";

const ordersStore = useOrdersStore();

const orders = computed(() => ordersStore.orders);

useAsyncData("ordersData", async () => {
  if (!orders.value?.length) {
    await ordersStore.fetchOrders();
  }
});
</script>
