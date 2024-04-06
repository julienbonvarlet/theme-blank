<template>
  <section class="fp-checkout">
    <FMSectionContainer max-width="l" :padding-x="true" :padding-y="true" class-child="fp-checkout__inner">
      <div class="fp-checkout__col fp-checkout__col--payment">
        <FALoader v-if="loading" size="m" />
        <div v-else class="fp-checkout__steps">
          <FMCheckoutAuth />
          <FMCheckoutAddress v-if="displayAddress" />
          <FMCheckoutShippingMethod v-if="displayShippingMethod" />
          <FMCheckoutPayment v-if="displayPayment" />
        </div>
      </div>
      <FMCheckoutResume class="fp-checkout__col fp-checkout__col--resume" />
    </FMSectionContainer>
  </section>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const authStore = useAuthStore();
const { shippingAddress, billingAddress, shippingMethodId } = useCartData();

const loading = ref(true);

const isAuthenticated = computed(() => authStore.authToken);
const displayAddress = computed(() => isAuthenticated.value);
const displayShippingMethod = computed(() => isAuthenticated.value && billingAddress.value && shippingAddress.value);
const displayPayment = computed(() => isAuthenticated.value && billingAddress.value && shippingAddress.value && shippingMethodId.value);

onMounted(() => {
  if (isAuthenticated.value) {
    userStore.fetchCurrentUser().finally(() => (loading.value = false));
  } else {
    loading.value = false;
  }
});
</script>

<style lang="scss">
.fp-checkout {
  &__inner {
    display: flex;
    align-items: flex-start;
  }

  .f-back {
    margin-bottom: var(--f-length-2);
  }

  &__col {
    &--payment {
      flex-grow: 1;

      .f-title.is-s {
        border-bottom: solid 1px var(--f-color-border);
        margin-bottom: var(--f-length-3);
        padding-bottom: var(--f-length-1);
      }
    }
  }

  &__steps {
    & > * {
      margin-bottom: var(--f-length-5);
    }
  }
}
</style>
