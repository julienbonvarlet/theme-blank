<template>
  <FTTradeIn>
    <FOTradeInCart
      @previous="router.push({ name: 'trade-in-customer-step-1' })"
    />
  </FTTradeIn>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
