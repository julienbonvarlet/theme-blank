<template>
  <div class="f-form-login">
    <FMFormMessage v-if="loginError && loginError !== ''" ref="login" type="error" :text="loginError" />
    <FormKit type="form" :submit-label="$t('account.identification.login.button')" @submit="submitLogin">
      <FormKit v-bind="loginFields[0]" />
      <FormKit v-bind="loginFields[1]" @suffix-icon-click="togglePasswordFieldType" />
    </FormKit>
    <FALink :text="$t('account.identification.login.forgot_password')" size="s" @click.prevent="displayPasswordPopin = true" />
  </div>

  <FMPopin
    extra-class="f-popin-reset-password"
    :visible="displayPasswordPopin"
    :title="$t('account.forget_password.title')"
    :text="$t('account.forget_password.text')"
    @on-close="
      displayPasswordPopin = false;
      passwordSuccess = false;
      passwordError = false;
    "
  >
    <div v-if="passwordSuccess">
      <FMFormMessage ref="passwordSuccess" type="success" :text="$t('account.forget_password.success')" />
      <FAButton :label="$t('global.close')" @click.prevent="displayPasswordPopin = false" />
    </div>
    <div v-else>
      <FMFormMessage v-if="passwordError" ref="passwordError" type="error" :text="$t('account.forget_password.error')" />
      <FormKit type="form" :submit-label="$t('account.forget_password.button')" @submit="submitPassword">
        <FormKit v-bind="passwordFields[0]" />
      </FormKit>
    </div>
  </FMPopin>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { togglePasswordFieldType } = useToggleFieldPasswordType();
const { login } = useAuthStore();
const { sendResetPasswordByEmail } = useUserStore();

const props = defineProps<{
  email: string;
}>();

const emit = defineEmits(["next", "goToRegister"]);
const loginError = ref<string | null>(null);
const passwordError = ref(false);
const passwordSuccess = ref(false);
const displayPasswordPopin = ref(false);

const loginFields = computed(() => [
  {
    label: t("global.form.email") + " *",
    type: "email",
    name: "email",
    validator: "required|email",
    value: props.email,
  },
  {
    label: t("global.form.password") + " *",
    type: "password",
    name: "password",
    validator: "required",
    suffixIcon: "eyeClosed",
  },
]);

const passwordFields = computed(() => [
  {
    label: t("global.form.email") + " *",
    type: "email",
    name: "email",
    validator: "required|email",
    value: props.email,
  },
]);

const submitLogin = async (formData) => {
  loginError.value = null;
  try {
    await login({
      email: formData.email,
      password: formData.password,
    });
    emit("next");
  } catch {
    loginError.value = t("account.identification.email_doesnt_exist");
  }
};

const submitPassword = async (formData) => {
  passwordError.value = false;
  passwordSuccess.value = false;
  try {
    await sendResetPasswordByEmail(formData.email);
    passwordSuccess.value = true;
  } catch {
    console.log("error", t("account.forget_password.error"));
    passwordError.value = true;
  }
};
</script>

<style lang="scss">
.f-form-login {
  text-align: left;
  max-width: var(--fk-max-width-input);
  margin: auto;

  .f-link {
    margin: auto;
  }
}

.f-popin-reset-password {
  .f-form-message {
    margin: 0 auto;
  }

  .f-button {
    margin-top: var(--f-length-3);
  }
}
</style>
