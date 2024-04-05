<template>
  <FTForm
    :title="$t('account.reset_password.title')"
    :button="$t('account.reset_password.button')"
    :success-message="$t('account.reset_password.success')"
    :fields="fields"
    :submit-function="resetPassword"
    :parameter1="token"
  >
    <FALink
      :text="$t('account.reset_password.back_login')"
      :to="{ name: 'login' }"
    />
  </FTForm>
</template>

<script lang="ts" setup>
import { useUserStore } from "../../stores/userStore";
import { useRoute } from "vue-router";

import { useI18n } from "vue-i18n";

const { resetPassword } = useUserStore();
const route = useRoute();
const token = ref(route.params.token);
const { t } = useI18n();

const fields = [
  {
    label: t("account.reset_password.label_password") + " *",
    type: "password",
    name: "password",
    validator: "required",
    validationVisibility: "live",
    validation:
      "|contains_numeric|contains_uppercase|contains_lowercase|contains_symbol|length:8,30",
    suffixIcon: "eyeClosed",
    minlength: "8",
    help: t("account.reset_password.helper"),
  },
  {
    label: t("account.reset_password.label_password_confirmation") + " *",
    type: "password",
    name: "passwordConfirm",
    validator: "required",
    validationVisibility: "live",
    validation:
      "|contains_numeric|contains_uppercase|contains_lowercase|contains_symbol|length:8,30",
    suffixIcon: "eyeClosed",
    minlength: "8",
  },
];
</script>
