<template>
  <div class="f-account-info">
    <FMAccountHeading :title="$t('account.informations.title')" size="m" />
    <FMFormMessage
      v-if="displaySuccessMessage"
      :text="$t('account.informations.message_success')"
      type="success"
    />
    <FMFormMessage
      v-if="displayErrorMessage"
      :text="$t('account.informations.message_error')"
      type="error"
    />
    <FormKit
      v-model="formData"
      type="form"
      :submit-label="$t('account.informations.button')"
      @submit="save"
    >
      <FormKit v-for="field in fields" :key="field" v-bind="field" />
    </FormKit>
    <FALink
      :text="$t('account.informations.update_password')"
      size="s"
      to="/account/informations/password"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { useUserStore } from "../../stores/userStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const displaySuccessMessage = ref(false);
const displayErrorMessage = ref(false);

const formData = reactive({
  gender: user.value?.gender,
  firstName: user.value?.firstName,
  lastName: user.value?.lastName,
  phone: user.value?.phone,
  birthdate: user.value?.birthdate,
  countryCode: user.value?.countryCode,
  locale: user.value?.locale,
  emailSubscription: user.value?.emailSubscription,
  smsSubscription: user.value?.smsSubscription,
});

const fields = [
  {
    type: "radio",
    name: "gender",
    validation: "required",
    label: t("global.form.gender") + " *",
    options: {
      female: t("global.form.gender_women"),
      male: t("global.form.gender_men"),
    },
    value: user.value?.gender,
  },
  {
    type: "text",
    name: "firstName",
    validation: "required",
    label: t("global.form.firstname") + " *",
    value: user.value?.firstName,
  },
  {
    type: "text",
    name: "lastName",
    validation: "required",
    label: t("global.form.lastname") + " *",
    value: user.value?.lastName,
  },
  {
    type: "text",
    disabled: "true",
    name: "email",
    validation: "required",
    label: t("global.form.email") + " *",
    value: user.value?.email,
  },
  {
    type: "tel",
    name: "phone",
    validation: "required",
    label: t("global.form.phone") + " *",
    value: user.value?.phone,
  },
  {
    type: "date",
    name: "birthdate",
    label: t("global.form.birthdate"),
    value: user.value?.birthdate,
  },
  {
    type: "checkbox",
    name: "emailSubscription",
    label: t("global.form.marketing_email"),
    value: user.value?.marketing_email,
  },
  {
    type: "checkbox",
    name: "smsSubscription",
    label: t("global.form.marketing_sms"),
    value: user.value?.smsSubscription,
  },
];

watch(formData, () => {
  displaySuccessMessage.value = false;
  displayErrorMessage.value = false;
});

const save = async () => {
  displayErrorMessage.value = false;
  displaySuccessMessage.value = false;
  const data = { ...formData };
  try {
    await userStore.updateUser(user.value?.id, data);
    displaySuccessMessage.value = true;
  } catch {
    displayErrorMessage.value = true;
  }
};
</script>

<style lang="scss">
.f-account-info {
  .f-form-message {
    margin-left: 0;
  }

  .formkit-input[type="submit"] {
    margin: auto;
  }

  .f-link {
    width: 100%;
    max-width: var(--fk-max-width-input);
    margin: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
