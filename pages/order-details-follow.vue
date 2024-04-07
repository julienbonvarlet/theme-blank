<template>
  <FMSectionContainer :padding-x="true" :padding-y="true" max-width="l">
    <FOAccountOrder v-if="orderDetails" :order="orderDetails" :back-url="false" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.authGuestToken);

const ordersStore = useOrdersStore();
const orderDetails = ref(null);

onMounted(async () => {
  if (isAuthenticated.value) {
    const orderId = localStorage.getItem("orderIdGuest");
    if (orderId) {
      const specificOrderDetails = await ordersStore.getOrderById(orderId);
      orderDetails.value = specificOrderDetails;
    }
  }
});
</script>

<style lang="scss"></style>
