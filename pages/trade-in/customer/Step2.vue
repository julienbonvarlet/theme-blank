<template>
  <FTTradeIn>
    <FOTradeInCart @previous="router.push({ name: 'trade-in-customer-step-1' })" />
  </FTTradeIn>
</template>

<script lang="ts" setup>
const router = useRouter();
</script>
