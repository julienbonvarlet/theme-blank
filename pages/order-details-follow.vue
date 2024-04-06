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
      try {
        const specificOrderDetails = await ordersStore.getOrderById(orderId);
        orderDetails.value = specificOrderDetails;
        console.log("Détails de la commande spécifique récupérés avec succès:", orderDetails.value);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la commande:", error);
      }
    }
  }
});
</script>

<style lang="scss"></style>
