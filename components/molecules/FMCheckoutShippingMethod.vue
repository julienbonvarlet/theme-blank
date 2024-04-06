<template>
  <div class="f-checkout-shipping">
    <FATitle size="s" :title="$t('pages.checkout.shipping.title')" />
    <FALoader v-if="loading" />
    <div v-else-if="shippingMethods?.length">
      <FMFormMessage v-if="error" type="error" :text="$t('pages.checkout.shipping.error_method')" />
      <ul class="f-checkout-shipping__list">
        <FMRadioInline
          v-for="method in shippingMethods"
          :key="method"
          v
          :title="method.name"
          :price="method.shippingCost"
          :checked="method['@id'] === shippingMethodId"
          @click="setShippingMethod(method['@id'])"
        />
      </ul>
    </div>
    <FMFormMessage v-else type="error" :text="$t('pages.checkout.shipping.error_country')" />
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const shippingMethodsStore = useShippingMethodsStore();

const { cartId, shippingMethods, shippingMethodId } = useCartData();
const loading = ref(true);
const error = ref(false);

const setShippingMethod = async (id) => {
  if (id !== shippingMethodId.value) {
    error.value = false;
    try {
      await cartStore.updateOrder({
        shippingMethod: id,
      });
    } catch {
      error.value = true;
    }
  }
};

onMounted(() => {
  if (shippingMethods.value?.length) {
    loading.value = false;
  } else {
    shippingMethodsStore.fetchShippingMethodsForOrder(cartId.value).then(() => (loading.value = false));
  }
});
</script>
