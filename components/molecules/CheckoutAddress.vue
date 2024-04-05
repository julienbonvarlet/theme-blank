<template>
  <div class="f-checkout-address">
    <FATitle size="s" :title="$t('pages.checkout.address.title')" />
    <FATabs
      v-if="addresses?.length"
      :options="billingTabs"
      :active="displayType"
      @change="(x) => (displayType = x)"
    />
    <FMFormMessage v-if="error" type="error" :text="error" />
    <FMFormSelectAddress
      v-if="displayType === 'shipping'"
      ref="shipping"
      :model="shippingAddress"
      @select="(id) => updateAddress(id, 'shippingAddress')"
    />
    <FMFormSelectAddress
      v-else
      ref="billing"
      :model="billingAddress"
      @select="(id) => updateAddress(id, 'billingAddress')"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const cartStore = useCartStore();
const addressesStore = useAddressesStore();

const loading = ref(true);
const error = ref<boolean | string>(false);
const displayType = ref("shipping");

const shippingAddress = computed(() => cartStore.cartOrder?.shippingAddress);
const billingAddress = computed(() => cartStore.cartOrder?.billingAddress);
const addresses = computed(() => addressesStore.addresses);

const updateAddress = async (
  id,
  type: "shippingAddress" | "billingAddress",
) => {
  error.value = false;
  try {
    const data = {
      [type]: id,
    };
    // On ajoute la même adresse de facturation par défaut
    if (
      type === "shippingAddress" &&
      (!billingAddress.value || billingAddress.value === shippingAddress.value)
    ) {
      data["billingAddress"] = id;
    }
    await cartStore.updateOrder(data);
  } catch (err) {
    error.value = err;
  }
};

const billingTabs = computed(() => [
  { label: t("pages.checkout.address.shipping"), value: "shipping" },
  { label: t("pages.checkout.address.billing"), value: "billing" },
]);

const emit = defineEmits(["onToggleBillingAddress"]);
</script>

<style lang="scss">
.f-checkout-address {
  .f-tabs {
    margin-bottom: var(--f-length-2);
  }
}
</style>
