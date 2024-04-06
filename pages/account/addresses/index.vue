<template>
  <FTAccount name="addresses">
    <FOAccountAddresses :addresses="addresses" />
  </FTAccount>
</template>

<script lang="ts" setup>
const addressesStore = useAddressesStore();
const addresses = computed(() => addressesStore.addresses);

useAsyncData("addressesData", async () => {
  if (!addresses.value?.length) {
    await addressesStore.fetchAddresses();
  }
});
</script>
