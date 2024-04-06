<template>
  <div class="f-account-voucher">
    <FMAccountHeading
      :title="$t('account.gift_cards.detail.title')"
      back-url="/account/vouchers"
    />
    <FMFormMessage
      v-if="!available"
      :text="$t('account.gift_cards.detail.not_sync_message')"
    />
    <FAText>{{ $t("account.gift_cards.detail.text") }}</FAText>
    <FMVoucherCard v-if="available && voucher.amount" :voucher="voucher" />
    <FAButton
      to="/account/vouchers/create"
      :label="$t('account.gift_cards.detail.button')"
      size="m"
      type="primary"
      icon="plus"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  voucher: Object,
});

const available = computed(
  () => props.voucher.state === "available" || props.voucher.sync,
);
</script>

<style lang="scss">
.f-account-voucher {
  & > *:not(:last-child) {
    margin-bottom: var(--f-length-3);
  }
}
</style>
