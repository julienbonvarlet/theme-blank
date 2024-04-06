<template>
  <div class="f-account-credits">
    <FMAccountHeading :title="$t('account.gift_cards.title')">
      <FAButton to="/sell" :label="$t('account.gift_cards.button_new_trade_in')" icon="plus" />
    </FMAccountHeading>
    <div class="f-account-credits__wallet">
      <FAText>{{ $t("account.gift_cards.text") }}</FAText>
      <FALink to="/faq">{{ $t("account.gift_cards.how_it_works") }}</FALink>
      <FMWalletCard :wallet-amount="walletAmount" />
    </div>
    <FMAccountHeading :title="$t('account.gift_cards.subtitle')" size="s" />
    <FALoader v-if="!vouchers" size="m" />
    <FAText v-else-if="!vouchers?.length" :text="$t('account.gift_cards.empty')" />
    <FMAccountList v-if="vouchers?.length" :items="vouchers" name="voucher" />
    <FMPagination v-if="pagination && vouchers?.length" v-bind="pagination" />
    <FMCreditsExplanation />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  vouchers?: any[];
  pagination?: Object;
  walletAmount?: Number;
}>();
</script>

<style lang="scss">
.f-account-credits {
  &__wallet {
    margin-bottom: var(--f-length-4);

    .f-link {
      margin: var(--f-length-1) 0 var(--f-length-2);
    }
  }
}
</style>
