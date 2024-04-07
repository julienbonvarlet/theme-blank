<template>
  <div class="f-account-credits">
    <FMAccountHeading :title="$t('account.gift_cards.title')">
      <FAButton to="/sell" :label="$t('account.gift_cards.button_new_trade_in')" :icon="IconNames.Plus" />
    </FMAccountHeading>
    <div class="f-account-credits__wallet">
      <FAText>{{ $t("account.gift_cards.text") }}</FAText>
      <FALink to="/faq">{{ $t("account.gift_cards.how_it_works") }}</FALink>
      <FMWalletCard :wallet-amount="walletAmount" />
    </div>
    <FMAccountHeading :title="$t('account.gift_cards.subtitle')" size="s" />
    <FALoader v-if="!giftCards" size="m" />
    <FAText v-else-if="!giftCards.length" :text="$t('account.gift_cards.empty')" />
    <FMAccountList v-if="giftCards.length" :items="giftCards" name="voucher" />
    <FMPagination v-if="pagination && giftCards.length" v-bind="pagination" />
    <FMCreditsExplanation />
  </div>
</template>

<script lang="ts" setup>
import type { GiftCard_jsonld } from "@faume-tech/sdk-recommerce";
import { IconNames } from "~/types/enums";

defineProps<{
  giftCards: GiftCard_jsonld[];
  pagination: Object;
  walletAmount: Number;
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
