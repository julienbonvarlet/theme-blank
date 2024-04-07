<template>
  <FTAccount name="voucher">
    <FALoader v-if="loading" size="l" />
    <FOAccountVoucher v-else-if="voucher" :voucher="voucher" />
    <div v-else>
      <FMFormMessage type="error" :text="$t('account.gift_cards.details.not_found.text')" />
      <br />
      <FAButton :label="$t('account.gift_cards.details.not_found.button')" to="/account/vouchers" />
    </div>
  </FTAccount>
</template>

<script lang="ts" setup>
const route = useRoute();
const giftCardStore = useGiftCardStore();

const loading = ref(true);
const error = ref<null | string>(null);
const voucher = ref<null | object>(null);

onMounted(async () => {
  try {
    voucher.value = await giftCardStore.getGiftCard(route.params.id as string);
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
});
</script>
