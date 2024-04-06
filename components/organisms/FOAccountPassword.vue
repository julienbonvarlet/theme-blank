<template>
  <div class="f-account-password">
    <FMAccountHeading
      :title="$t('account.informations.password_edit.title')"
      size="m"
      back-url="/account/informations"
    />
    <FMFormMessage
      v-if="displaySuccessMessage"
      :text="$t('account.informations.password_edit.message_success')"
      type="success"
    />
    <FMFormMessage v-if="displayErrorMessage" :text="displayErrorMessage" type="error" />
    <FormKit
      v-model="formData"
      type="form"
      :submit-label="$t('account.informations.password_edit.button')"
      @submit="save"
    >
      <FormKit
        v-for="field in fields"
        :key="field"
        v-bind="field"
        suffix-icon="eyeClosed"
        validator="required"
        type="password"
        @suffix-icon-click="togglePasswordFieldType"
      />
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const userStore = useUserStore();
const { togglePasswordFieldType } = useToggleFieldPasswordType();

const user = computed(() => userStore.user);
const displaySuccessMessage = ref(false);
const displayErrorMessage = ref<boolean | string>(false);

const formData = reactive({
  oldPassword: null,
  password: null,
  passwordConfirm: null,
});

const fields = [
  {
    name: "oldPassword",
    label: t("account.informations.password_edit.label_password"),
  },
  {
    name: "password",
    label: t("account.informations.password_edit.label_new_password"),
    help: t("account.informations.password_edit.help"),
    minlength: "8",
    validation: "required|length:8,30|contains_numeric|contains_uppercase|contains_lowercase|contains_symbol",
  },
  {
    name: "passwordConfirm",
    label: t("account.informations.password_edit.label_confirmation_new_password"),
  },
];

watch(formData, () => {
  displaySuccessMessage.value = false;
  displayErrorMessage.value = false;
});

const save = async () => {
  displayErrorMessage.value = false;
  displaySuccessMessage.value = false;
  try {
    await userStore.changePassword(user.value?.id, { ...formData });
    displaySuccessMessage.value = true;
  } catch (err) {
    displayErrorMessage.value = err;
  }
};
</script>

<style lang="scss">
.f-account-password {
  .f-form-message {
    margin-left: 0;
  }

  .formkit-input[type="submit"] {
    margin: auto;
  }
}
</style>
