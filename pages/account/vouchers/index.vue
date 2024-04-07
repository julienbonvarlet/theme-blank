<template>
  <FTAccount name="gift-cards">
    <FOAccountCredits :wallet-amount="walletAmount" :gift-cards="giftCards" />
  </FTAccount>
</template>

<script lang="ts" setup>
const gidtCardStore = useGiftCardStore();
const userStore = useUserStore();

const user = userStore.user;
const walletAmount = user!.walletAmount || 0;
const giftCards = gidtCardStore.giftCards;

useAsyncData("accountGiftCards", async () => {
  if (!giftCards!.length) {
    await gidtCardStore.getGiftCards();
  }
});
</script>
