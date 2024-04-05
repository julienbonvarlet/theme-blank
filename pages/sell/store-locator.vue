<template>
  <div class="fp-store-locator">
    <FOStoreLocator :stores="stores" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from "#imports";

const { $API } = useNuxtApp();

// Fetch stores data
const { data: apiResult } = await useAsyncData(
  "products",
  //TODO: use SDK to fetch data when backend is ready
  () => $API.realStore.apiCustomerRealStoresGetCollection(),
);
const stores = apiResult.value["hydra:member"];
</script>

<style lang="scss"></style>
