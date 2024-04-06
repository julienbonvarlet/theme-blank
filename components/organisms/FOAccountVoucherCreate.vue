<template>
  <div class="f-account-create-voucher">
    <FMAccountHeading :title="$t('account.gift_cards.create.title')" back-url="/account/vouchers" />
    <FMWalletCard :wallet-amount="walletAmount" />
    <FormKit
      v-model="formData"
      type="form"
      :submit-label="$t('account.gift_cards.create.button', { amount: formData.amount || 0 })"
      @submit="submit"
    >
      <FMFormMessage v-if="error" :text="error" type="error" />
      <FormKit
        type="radio"
        :label="$t('account.gift_cards.create.fields.where.label')"
        :options="{
          client: $t('account.gift_cards.types.client'),
          sale: $t('account.gift_cards.types.sale'),
          real: $t('account.gift_cards.types.real'),
        }"
        name="type"
        validation="required"
      />
      <FormKit
        type="number"
        :label="$t('account.gift_cards.create.fields.amount.label')"
        :help="$t('account.gift_cards.create.fields.amount.helper')"
        name="amount"
        number="integer"
        :step="data.step || 1"
        :min="data.min"
        :max="data.max"
        validation="required"
      />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const voucherStore = useVouchersStore();
const router = useRouter();

const user = computed(() => userStore.user);
const walletAmount = computed(() => user.value?.walletAmount || 0);

const data = ref({
  min: 5,
  max: 200,
  step: 1,
});
const error = ref<string | null>(null);

const formData = reactive({
  amount: 0,
  currency: "EUR",
  type: "client",
});

const submit = async () => {
  try {
    const data = { ...formData };
    data.amount = data.amount * 100; // Convert into euro cents
    const voucher = await voucherStore.createVoucher(data);
    router.push(`/account/vouchers/${voucher.id}`);
  } catch (err) {
    error.value = err;
  }
};
</script>

<style lang="scss">
.f-account-create-voucher {
  .f-wallet-card {
    margin-bottom: var(--f-length-3);

    .f-button {
      display: none;
    }
  }

  .f-form-message {
    margin-left: 0;
  }
}
</style>
