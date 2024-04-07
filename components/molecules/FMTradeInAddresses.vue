<template>
  <div class="f-ti-addresses">
    <FMFormMessage v-if="error" type="error" :text="error || $t('trade_in.address.error_selected_invalid')" />
    <FMFormSelectAddress :model="selectedAddress" @select="selectAddress" />
    <FAButton v-if="isValid" class="f-ti-addresses__confirm" :label="$t('trade_in.address.button_confirm')" :is-loading="loading" @click.prevent="confirm" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["next"]);

const addressStore = useAddressesStore();
const tradeInModule = useTradeInModule();

const loading = ref(false);
const error = ref<boolean | string>(false);

const addresses = computed(() => addressStore.addresses);
const selectedAddress = computed(() => tradeInModule.selectedAddress);
const isValid = computed(() => (selectedAddress.value ? addresses.value?.find((x) => x["@id"] === selectedAddress.value) : null));

const confirm = async () => {
  loading.value = true;
  try {
    await tradeInModule.confirmCart();
    loading.value = false;
    emit("next");
  } catch (err) {
    error.value = err || true;
    loading.value = false;
  }
};

const selectAddress = async (id) => {
  try {
    await tradeInModule.selectAddress(id);
  } catch (err) {
    error.value = err;
  }
};

// Tracking Plan //
if (process.client) {
  useNuxtApp().$trackingPlan?.tradeinViewShippingAddress();
}
// Tracking Plan //
</script>

<style lang="scss">
.f-ti-addresses {
  text-align: left;
  $self: &;

  .f-form-message {
    margin-left: 0;
  }

  button#{$self}__confirm {
    margin: var(--f-length-3) 0 0 0;

    @include media("<desktop") {
      margin: var(--f-length-2) auto 0;
    }
  }
}
</style>
