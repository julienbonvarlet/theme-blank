<template>
  <div class="f-account-detail">
    <FMAccountHeading :title="title" :back-url="backUrl" size="m">
      <slot name="heading" />
    </FMAccountHeading>

    <div class="f-account-detail__presentation">
      <div v-if="informationTable" class="f-account-detail__informations">
        <FMAccountHeading :title="$t('account.informations.title')" size="s" />
        <FMAccountTable :lines="informationTable" />
        <slot name="informations" />
      </div>

      <div v-if="timeline" class="f-account-detail__timeline">
        <FMAccountHeading :title="$t('global.track')" size="s" />
        <FMTimeline :steps="timeline" size="s" />
      </div>
    </div>

    <div v-if="orderArticles || resaleArticles" class="f-account-detail__list">
      <FMAccountHeading :title="$t('account.trade_ins.detail.articles')" size="s" />
      <FMAccountList v-if="resaleArticles" :items="resaleArticles" name="resaleArticle" />
      <FMAccountList v-else :items="orderArticles" name="orderArticle" />
      <slot name="listing" />
    </div>

    <div v-if="paymentTable" class="f-account-detail__payment">
      <FMAccountHeading :title="$t('pages.checkout.payment.title')" size="s" />
      <FMAccountTable :lines="paymentTable" />
      <slot name="payment" />
    </div>

    <div v-if="shippingAddress || billingAddress" class="f-account-detail__shipping-billing">
      <div v-if="shippingAddress" class="f-account-detail__shipping">
        <FMAccountHeading :title="$t('pages.checkout.shipping.title')" size="s" />
        <FMAddressCard :address="shippingAddress" :display-cta="false" />
        <slot name="shipping" />
      </div>

      <div v-if="billingAddress" class="f-account-detail__shipping">
        <FMAccountHeading :title="$t('pages.checkout.address.billing')" size="s" />
        <FMAddressCard :address="billingAddress" :display-cta="false" />
        <slot name="billing" />
      </div>
    </div>

    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  backUrl?: string;
  timeline?: Array;
  orderArticles?: Array;
  resaleArticles?: Array;
  informationTable: Array;
  paymentTable?: Array;
  shippingAddress?: object;
  billingAddress?: object;
}>();
</script>

<style lang="scss">
.f-account-detail {
  & > * {
    margin-bottom: var(--f-length-6);
  }

  &__shipping-billing {
    display: flex;
    gap: var(--f-length-2);
    width: 100%;

    & > * {
      flex-grow: 1;
    }
  }

  &__shipping,
  &__billing {
    .f-address-card {
      background-color: transparent;
      padding: 0;
    }
  }

  &__presentation {
    display: flex;
    gap: var(--f-length-2);
    width: 100%;
    align-items: flex-start;
  }

  &__informations {
    flex-grow: 1;
  }

  &__timeline,
  &__shipping,
  &__billing {
    padding: var(--f-length-3);
    background-color: var(--f-color-background-light);
  }

  &__timeline {
    width: 300px;
  }
}
</style>
