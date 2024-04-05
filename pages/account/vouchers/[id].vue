<template>
  <FTAccount name="voucher">
    <FALoader v-if="loading" size="l" />
    <FOAccountVoucher v-else-if="voucher" :voucher="voucher" />
    <div v-else>
      <FMFormMessage
        type="error"
        :text="$t('account.gift_cards.details.not_found.text')"
      />
      <br />
      <FAButton
        :label="$t('account.gift_cards.details.not_found.button')"
        to="/account/vouchers"
      />
    </div>
  </FTAccount>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useVouchersStore } from "../../../stores/vouchers";

const route = useRoute();
const voucherStore = useVouchersStore();

const loading = ref(true);
const error = ref<null | string>(null);
const voucher = ref<null | object>(null);

onMounted(async () => {
  try {
    voucher.value = await voucherStore.getVoucher(route.params.id);
    loading.value = false;
  } catch (err) {
    error.value = err;
    loading.value = false;
  }
});
</script>
