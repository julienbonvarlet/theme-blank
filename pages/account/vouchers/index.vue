<template>
  <FTAccount name="vouchers">
    <FOAccountCredits :wallet-amount="walletAmount" :vouchers="vouchers" />
  </FTAccount>
</template>

<script lang="ts" setup>
const vouchersStore = useVouchersStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const walletAmount = computed(() => user.value?.walletAmount || 0);
const vouchers = computed(() => vouchersStore.vouchers);

useAsyncData("accountVouchers", async () => {
  if (!vouchers.value?.length) {
    await vouchersStore.getVouchers();
  }
});
</script>
