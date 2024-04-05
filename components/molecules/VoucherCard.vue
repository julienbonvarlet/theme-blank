<template>
  <div class="f-voucher-card">
    <FAButtonIcon icon="gift-card" />
    <FMCardText v-bind="cardInlineData" />
    <div class="f-voucher-card__right">
      <FATagStatus v-bind="tag" />
      <FAPromotionalCode v-if="voucher.code" :code="voucher.code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDateFormatter } from "../../composables/useDateFormatter";
import { usePriceFormatter } from "../../composables/usePriceFormatter";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { formatPriceWithoutCents } = usePriceFormatter();
const { formatDate } = useDateFormatter();

const props = defineProps<{
  voucher: object;
}>();

const types = computed(() => {
  return {
    client: t("account.gift_cards.types.client"),
    sale: t("account.gift_cards.types.sale"),
    real: t("account.gift_cards.types.real"),
  };
});

const available = computed(() => props.voucher.state === "available");
const cardInlineData = computed(() => {
  const voucher = props.voucher;
  return {
    title: formatPriceWithoutCents(voucher.amount),
    text: t("account.gift_cards.use_at", { type: types.value[voucher.type] }),
    description: voucher.createdAt ? formatDate(voucher.createdAt) : null,
    details:
      voucher.expiredAt && voucher.state === "available"
        ? t("account.gift_cards.expire_at", {
            date: formatDate(voucher.expiredAt),
          })
        : null,
  };
});

const tag = computed(() => {
  const state = props.voucher.state;
  let date = null;
  if (state === "burned") date = formatDate(props.voucher.burnedAt);
  else if (state === "expired") date = formatDate(props.voucher.expiredAt);
  const statesColors = {
    available: "success",
    burned: "light",
    cancel: "error",
    expired: "error",
    sync: "light",
  };
  return {
    text: t(`account.gift_cards.status.${state}`, { date }),
    color: statesColors[state],
  };
});
</script>

<style lang="scss">
.f-voucher-card {
  padding: var(--f-length-2);
  background-color: var(--f-color-background-light);
  display: flex;
  align-items: center;
  gap: var(--f-length-2);

  &__right {
    flex-grow: 1;
    display: flex;
    gap: var(--f-length-1);

    @include media("<tablet") {
      flex-direction: column;
      align-items: flex-end;
    }

    @include media(">=tablet") {
      justify-content: flex-end;
    }
  }

  .f-button-icon {
    pointer-events: none;
  }
}
</style>
