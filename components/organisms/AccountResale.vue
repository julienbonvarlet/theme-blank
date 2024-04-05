<template>
  <FOAccountDetail
    v-if="resale"
    :title="$t('account.trade_ins.detail.title', { id: resale.reference })"
    :timeline="timeline"
    back-url="/account/resales"
    :resale-articles="resale.items"
    :information-table="informationTable"
    class="f-account-resale"
  >
    <template
      v-if="resale.rejectReasons?.length || resale.creditedAt"
      #informations
    >
      <FMWalletCard v-if="resale.creditedAt" />
      <div v-if="resale.rejectReasons?.length" class="f-account-resale__reject">
        <FMAccountHeading
          :title="$t('account.trade_ins.detail.rejected.title')"
          size="s"
        />
        <FMFormMessage :text="$t('account.trade_ins.detail.rejected.text')" />
        <FAText>{{ resale.rejectReasons.join(" • ") }}</FAText>
        <ul class="f-account-resale__reject__images">
          <li v-for="image in resale.rejectImages" :key="image">
            <img :src="image" alt="Reprise rejetée" />
          </li>
        </ul>
      </div>
    </template>

    <template #bottom>
      <section
        v-if="resale.state === 'draft'"
        class="f-account-resale__not-validated"
      >
        <FMAccountHeading
          :title="$t('account.trade_ins.detail.not_validated.title')"
          size="s"
        />
        <FAText :text="$t('account.trade_ins.detail.not_validated.text')" />
        <FAButton
          :label="$t('account.trade_ins.detail.not_validated.button')"
          @click.prevent="continueTradeIn"
        />
      </section>
      <section
        v-if="
          !resale.sentAt && !resale.receivedAt && resale.state === 'validated'
        "
        class="f-account-resale__explanation"
      >
        <FMAccountHeading
          :title="$t('account.trade_ins.detail.how_to_send')"
          size="s"
        />
        <FMResaleShippingExplanation :resale="resale" />
      </section>
    </template>
  </FOAccountDetail>
</template>

<script setup lang="ts">
import {
  computed,
  usePriceFormatter,
  useDateFormatter,
  useTradeInModule,
  useTradeInTimeline,
} from "#imports";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { formatPrice } = usePriceFormatter();
const { formatDate } = useDateFormatter();
const { resumeTradeIn } = useTradeInModule();
const router = useRouter();

const props = defineProps<{
  resale: object;
}>();

const pushInTable = (title: string, value: string) => ({
  title,
  value,
});

const estimatedTotal = computed(
  () =>
    props.resale?.items?.reduce((total, item) => total + item.priceResale, 0) ||
    0,
);
const creditedTotal = computed(
  () =>
    props.resale?.items?.reduce((total, item) => total + item.priceCredit, 0) ||
    0,
);

const timeline = useTradeInTimeline(props.resale, {
  trade_in_created: t("account.trade_ins.detail.created_date"),
  waiting_for_validation: t("account.trade_ins.status.not_validated"),
  finalize_form: t("account.trade_ins.detail.finalize_form"),
  waiting_for_send: t("account.trade_ins.detail.waiting_for_shipping"),
  send_to_receive: t("account.trade_ins.detail.send_to_receive"),
  waiting_for_review: t("account.trade_ins.status.waiting_for_review"),
  receivedAt: t("account.trade_ins.status.delivered"),
  expert_analysing: t("account.trade_ins.detail."),
  controlled: t("account.trade_ins.status.waiting_for_review"),
  credited: t("account.trade_ins.status.credited"),
  wallet_credited_of: t("account.trade_ins.status.credited"),
  shipped: t("account.trade_ins.status.shipped"),
  sent: t("account.trade_ins.status.sent"),
});

const informationTable = computed(() => {
  if (!props.resale) {
    return null;
  }
  const resale = props.resale;
  const data = [];
  data.push(
    pushInTable(t("account.trade_ins.detail.reference"), resale.reference),
  );
  data.push(
    pushInTable(
      t("account.trade_ins.detail.created_date"),
      formatDate(resale.createdAt),
    ),
  );
  data.push(
    pushInTable(
      t(
        `account.trade_ins.detail.article${resale.items?.length > 1 ? "s" : ""}`,
      ),
      resale.items?.length || 0,
    ),
  );
  data.push(
    pushInTable(
      t("account.trade_ins.detail.estimated_amount"),
      formatPrice(estimatedTotal.value),
    ),
  );
  if (resale.trackingNumber) {
    data.push(
      pushInTable(
        t("account.trade_ins.detail.tracking_number"),
        resale.trackingNumber,
      ),
    );
  }
  if (creditedTotal.value > 0) {
    data.push(
      pushInTable(
        t("account.trade_ins.detail.credited_amount"),
        formatPrice(creditedTotal.value),
      ),
    );
  }
  return data;
});

const continueTradeIn = () => {
  resumeTradeIn(props.resale);
  router.push({ name: "trade-in-customer-step-3" });
};
</script>

<style lang="scss">
.f-account-resale {
  &__reject {
    margin-top: var(--f-length-4);

    & > *:not(:last-child) {
      margin-bottom: var(--f-length-2);
    }

    &__images {
      display: flex;
      flex-wrap: wrap;
      gap: var(--f-length-1);

      img {
        width: 80px;
        height: auto;
      }
    }
  }

  .f-wallet-card {
    margin-top: var(--f-length-4);
  }

  &__not-validated {
    button {
      margin-top: var(--f-length-3);
    }
  }
}
</style>
