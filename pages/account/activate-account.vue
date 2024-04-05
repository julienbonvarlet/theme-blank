<template>
  <FTForm
    :title="$t('account.activate_account.title')"
    :button="$t('account.activate_account.button')"
    :fields="fields"
    :submit-function="enableAccount"
    @handle-success="router.push({ name: 'account' })"
  >
    <FALink
      :text="$t('account.identification.login.back_login')"
      :to="{ name: 'login' }"
    />
  </FTForm>
</template>

<script lang="ts" setup>
import { useAuthStore, useRouter } from "#imports";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { enableAccount } = useAuthStore();
const router = useRouter();

const fields = [
  {
    label: t("global.form.email") + " *",
    type: "email",
    name: "email",
    validator: "required",
  },
];
</script>
