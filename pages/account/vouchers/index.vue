<template>
  <FTAccount name="vouchers">
    <FOAccountCredits :wallet-amount="walletAmount" :vouchers="vouchers" />
  </FTAccount>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";
import { useVouchersStore } from "../../../stores/vouchers";
import { useUserStore } from "../../../stores/userStore";

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
