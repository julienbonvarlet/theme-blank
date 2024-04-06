<template>
  <div class="f-form-register">
    <FMFormMessage v-if="error && error !== ''" type="error" :text="error" />
    <FormKit
      type="form"
      :submit-label="$t('account.identification.register.button')"
      @submit="submit"
    >
      <template v-for="(field, i) in registerFields" :key="field.name">
        <FormKit v-if="field.type !== 'password'" v-bind="field" />
        <FormKit
          v-else-if="field.name === 'password'"
          type="group"
          name="password"
        >
          <FormKit
            v-bind="field"
            @suffix-icon-click="togglePasswordFieldType"
          />
          <FormKit
            v-bind="registerFields[i + 1]"
            @suffix-icon-click="togglePasswordFieldType"
          />
        </FormKit>
      </template>
      <FormKit
        v-model="emailSubscription"
        type="checkbox"
        name="emailSubscription"
        :label="$t('global.form.marketing_email')"
      />
      <FormKit
        v-model="smsSubscription"
        type="checkbox"
        name="smsSubscription"
        :label="$t('global.form.marketing_sms')"
      />
    </FormKit>
    <FALink
      :text="$t('account.identification.login.button')"
      size="s"
      @click.prevent="emit('goToLogin')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  AsYouType,
  getExampleNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

const { t } = useI18n();

const { togglePasswordFieldType } = useToggleFieldPasswordType();
const { register } = useAuthStore();

const props = defineProps<{
  email: string;
}>();

const error = ref<null | string>(null);
const emit = defineEmits(["next", "goToLogin"]);

const selectedCountry = ref("FR");
const phoneFieldValue = ref("");

// Définition du code du pays calculé basé sur le pays sélectionné
const countryCallingCode = computed(() => {
  const exampleNumber = getExampleNumber(selectedCountry.value, examples);
  return exampleNumber ? `+${exampleNumber.countryCallingCode}` : "";
});
const country = computed(() => {
  const exampleNumber = getExampleNumber(selectedCountry.value, examples);
  return exampleNumber ? exampleNumber.country : "";
});
onMounted(() => {
  phoneFieldValue.value = countryCallingCode.value;
});
watch(
  selectedCountry,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      phoneFieldValue.value = countryCallingCode.value;
    }
  },
  { immediate: true }
);
watch(phoneFieldValue, (newValue, oldValue) => {
  const asYouType = new AsYouType(selectedCountry.value);
  const formatted = asYouType.input(newValue);
  if (asYouType.isValid() || newValue.length > oldValue.length) {
    phoneFieldValue.value = formatted;
  }
});

const phonePlaceholder = computed(() => {
  const exampleNumber = getExampleNumber(selectedCountry.value, examples);
  return exampleNumber
    ? exampleNumber.formatInternational()
    : t("global.form.phone");
});

const countries = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("https://api.faume.co/api/public/countries");
    const data = await response.json();
    countries.value = data.map((country) => ({
      value: country.code,
      label: `${country.name} (${country.flag})`,
    }));
  } catch (error) {
    console.error("Error fetching countries", error);
  }
});

const emailSubscription = ref(false);
const smsSubscription = ref(false);

const registerFields = computed(() => [
  {
    type: "radio",
    name: "gender",
    label: t("global.form.gender") + " *",
    options: {
      female: t("global.form.gender_women"),
      male: t("global.form.gender_men"),
    },
  },
  {
    type: "text",
    name: "firstName",
    validation: "required|matches:/^[A-Za-zÀ-ÿ\\s-]*$/",
    label: t("global.form.firstname") + " *",
    validationMessages: {
      matches: t("global.form.firstname_helper"),
    },
  },
  {
    type: "text",
    name: "lastName",
    validation: "required|matches:/^[A-Za-zÀ-ÿ\\s-]*$/",
    label: t("global.form.lastname") + " *",
    validationMessages: {
      matches: t("global.form.lastname_helper"),
    },
  },
  {
    type: "email",
    name: "email",
    validation: "required",
    label: t("global.form.email") + " *",
    value: props.email,
  },
  {
    type: "select",
    name: "countryCode",
    label: t("global.form.country") + " *",
    options: countries.value,
    classes: {
      outer: "fk-country-select",
    },
    modelValue: selectedCountry.value,
    onInput: (newValue) => {
      selectedCountry.value = newValue;
    },
  },
  {
    type: "tel",
    name: "phone",
    label: t("global.form.phone") + " *",
    classes: {
      outer: "fk-tel",
    },
    modelValue: phoneFieldValue.value,
    validation: "required",
    placeholder: phonePlaceholder.value,
    onInput: (newValue) => {
      phoneFieldValue.value = newValue;
    },
  },
  {
    type: "date",
    name: "birthdate",
    label: t("global.form.birthdate"),
  },
  {
    type: "password",
    name: "password",
    label: t("global.form.password") + " *",
    validation:
      "required|length:8,30|contains_numeric|contains_uppercase|contains_lowercase|contains_symbol",
    validationVisibility: "live",
    suffixIcon: "eyeClosed",
  },
  {
    type: "password",
    name: "password_confirm",
    validator: "required",
    validationVisibility: "live",
    validation: "confirm",
    label: t("global.form.password_confirmation") + " *",
    suffixIcon: "eyeClosed",
    minlength: "8",
  },
  {
    type: "checkbox",
    name: "cgv",
    validation: "required",
    label: t("global.form.conditions_of_use") + " *",
  },
]);

const displayError = (msg) => {
  error.value = msg;
  window.scrollTo({ top: 0 });
};

const submit = async (formData) => {
  try {
    error.value = null;

    const phoneNumber = parsePhoneNumberFromString(
      phoneFieldValue.value,
      selectedCountry.value
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      const exampleNumber = getExampleNumber(selectedCountry.value, examples);
      const formattedExample = exampleNumber.formatInternational();
      displayError(
        `${t("global.form.phone_invalid")} ${selectedCountry.value}: ${formattedExample}`
      );
      return;
    }

    formData.phone = phoneNumber.formatInternational();

    const newFormData = {
      ...formData,
      countryCode: formData.countryCode,
      locale: "fr_FR",
      password: formData.password.password,
      phone: formData.phone,
      emailSubscription: emailSubscription.value,
      smsSubscription: smsSubscription.value,
    };
    delete newFormData.cgv;
    delete newFormData.password_confirm;
    await register(newFormData);
    emit("next");
  } catch (err) {
    const formattedViolations = err.body.violations
      .map((v) => `${v.propertyPath}: ${v.message}`)
      .join("\n");
    displayError(formattedViolations);
  }
};
</script>

<style lang="scss">
.f-form-register {
  text-align: left;
  max-width: var(--fk-max-width-input);
  margin: auto;

  button[type="submit"] {
    margin: auto;
  }

  fieldset {
    margin: auto;

    & > ul.formkit-options {
      display: flex;
      gap: var(--f-length-3);
      flex-wrap: wrap;
      margin-top: var(--f-length-1);
    }
  }

  .f-link {
    margin: auto;
  }

  .formkit-form {
    .fk-country-select {
      display: inline-block;
      width: 33%;
      margin: 0;
      margin-right: var(--f-length-1);
    }
    .fk-tel {
      display: inline-block;
      width: calc(67% - var(--f-length-1));
      margin: 0;
      .formkit-message {
        position: absolute;
      }
    }
  }
}
</style>
