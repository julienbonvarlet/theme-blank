<template>
  <FTForm
    :title="$t('account.activate_account.title')"
    :button="$t('account.activate_account.button')"
    :fields="fields"
    :submit-function="enableAccount"
    @handle-success="router.push({ name: 'account' })"
  >
    <FALink :text="$t('account.identification.login.back_login')" :to="{ name: 'login' }" />
  </FTForm>
</template>

<script lang="ts" setup>
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
