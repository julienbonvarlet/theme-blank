<template>
  <FTAccount name="order">
    <FALoader v-if="!order" size="l" />
    <FOAccountOrder v-else :order="order" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useAsyncData } from "nuxt/app";
import { useOrdersStore } from "#imports";
import { useRoute } from "vue-router";

const route = useRoute();
const ordersStore = useOrdersStore();

const order = ref(null);

const loadOrderData = async (id) => {
  return await ordersStore.getOrderById(id);
};

const { data: orderData } = await useAsyncData("orderData", () => {
  const slug = route.params.id;
  if (slug) {
    return loadOrderData(slug);
  }
});

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      order.value = await loadOrderData(newId);
    }
  },
  { immediate: true },
);

watch(orderData, (newOrderData) => {
  order.value = newOrderData;
});
</script>
