<template>
  <div class="f-wallet-card">
    <div class="f-wallet-card__title">
      <FAIcon icon="wallet" />
      <FAText>{{ $t("account.gift_cards.total_credits") }}</FAText>
    </div>
    <FAPrice :price="walletAmount" size="l" :cents="false" />
    <FAButton v-if="walletAmount > 0" to="/account/vouchers/create" type="secondary" :label="$t('account.gift_cards.button_convert')" size="s" icon="gift-card" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  walletAmount?: Number;
}>();
</script>

<style lang="scss">
.f-wallet-card {
  padding: var(--f-length-3);
  border-radius: var(--f-length-2);
  background-color: var(--f-color-background-dark);
  color: var(--f-color-text-light);
  display: flex;
  flex-direction: column;
  gap: var(--f-length-2);
  width: fit-content;

  @include media("<tablet") {
    padding: var(--f-length-2);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: var(--f-length-1);
  }
}
</style>
