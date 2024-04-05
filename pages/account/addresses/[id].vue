<template>
  <FTAccount name="address">
    <FOAccountAddressEdit v-if="address" :address="address" />
    <FALoader v-else size="m" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { useAsyncData } from "nuxt/app";
import { useAddressesStore } from "../../../stores/addresses";
import { useRoute } from "vue-router";

const route = useRoute();
const addressesStore = useAddressesStore();
const address = ref<null | object>(null);

const loadAddress = async (id) => {
  try {
    address.value = await addressesStore.fetchAddressById(id);
  } catch {
    address.value = null;
  }
};

const { data: addressData } = await useAsyncData("addressData", () => {
  const id = route.params.id;
  if (id) {
    return addressesStore.fetchAddressById(id);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    loadAddress(newId);
  },
);

watch(
  addressData,
  (newData) => {
    address.value = newData;
  },
  { immediate: true },
);
</script>
