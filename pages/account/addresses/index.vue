<template>
  <FTAccount name="addresses">
    <FOAccountAddresses :addresses="addresses" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";
import { useAddressesStore } from "../../../stores/addresses";

const addressesStore = useAddressesStore();

const addresses = computed(() => addressesStore.addresses);

useAsyncData("addressesData", async () => {
  if (!addresses.value?.length) {
    await addressesStore.fetchAddresses();
  }
});
</script>
