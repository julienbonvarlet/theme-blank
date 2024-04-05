<template>
  <FTAccount name="account">
    <FOAccountOverview />
  </FTAccount>
</template>

<script lang="ts" setup>
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: "auth",
});
</script>
