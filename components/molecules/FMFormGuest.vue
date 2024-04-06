<template>
  <div class="f-form-guest">
    <FMFormMessage v-if="error && error !== ''" type="error" :text="error" />
    <FormKit
      type="form"
      :submit-label="$t('pages.checkout.identification.continue_as_guest')"
      @submit="submit"
    >
      <template v-for="field in registerFields" :key="field.name">
        <FormKit v-bind="field" />
      </template>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { registerAsGuest } = useAuthStore();

const props = defineProps<{
  email: string;
}>();

const error = ref<null | string>(null);
const emit = defineEmits(["next"]);

const registerFields = computed(() => [
  {
    type: "text",
    name: "firstName",
    validation: "required",
    label: t("global.form.firstname") + " *",
  },
  {
    type: "text",
    name: "lastName",
    validation: "required",
    label: t("global.form.lastname") + " *",
  },
  {
    label: t("global.form.email") + " *",
    type: "email",
    name: "email",
    validator: "required|email",
    value: props.email,
  },
  {
    type: "tel",
    name: "phone",
    validator: "required",
    label: t("global.form.phone") + " *",
    placeholder: "+33 6 12 34 56 78",
  },
]);

const displayError = (msg) => {
  error.value = msg;
  window.scrollTo({ top: 0 });
  setTimeout(() => (error.value = null), 4000);
};

const submit = async (formData) => {
  try {
    error.value = null;
    await registerAsGuest({
      ...formData,
      countryCode: "FRA",
      locale: "fr_FR",
      phone: formData.phone.replaceAll(" ", ""),
    });
    emit("next");
  } catch (err) {
    displayError(err);
  }
};
</script>

<style lang="scss">
.f-form-guest {
  text-align: left;
  max-width: var(--fk-max-width-input);

  button[type="submit"] {
    margin: auto;
  }
}
</style>
