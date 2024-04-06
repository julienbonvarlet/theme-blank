<template>
  <div class="f-form-address" :class="[inlineClass]">
    <FMFormMessage v-if="error && error !== ''" type="error" :text="error" />
    <FMFormMessage v-if="success" type="success" :text="successMessage" />
    <FormKit v-model="formData" type="form" :submit-label="buttonLabel || $t('global.validate')" @submit="submit">
      <FormKit v-for="field in fields" :key="field" v-bind="field" />
    </FormKit>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps<{
  address?: Object;
  buttonLabel?: string;
  successMessage?: string;
  inlineDesktop?: boolean;
}>();

const userStore = useUserStore();
const addressStore = useAddressesStore();

const emit = defineEmits(["next"]);

const inlineClass = computed(() => (props.inlineDesktop ? "is-inline-desktop" : null));
const user = computed(() => userStore.user);
const error = ref<string | null>(null);
const success = ref(false);
const formData = ref({
  firstName: null,
  lastName: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  zipCode: null,
  country: "FR",
  phone: null,
  isDefault: false,
});

const fields = computed(() => [
  {
    type: "text",
    name: "firstName",
    label: t("global.form.firstname") + " *",
    validator: "required",
  },
  {
    type: "text",
    name: "lastName",
    label: t("global.form.lastname") + " *",
    validator: "required",
  },
  {
    type: "text",
    name: "addressLine1",
    label: t("global.form.address1") + " *",
    validator: "required",
  },
  {
    type: "text",
    name: "addressLine2",
    label: t("global.form.address2"),
  },
  {
    type: "text",
    name: "city",
    label: t("global.form.city") + " *",
    validator: "required",
  },
  {
    type: "text",
    name: "zipCode",
    label: t("global.form.zip") + " *",
    validator: "required",
  },
  {
    type: "select",
    name: "countryCode",
    label: t("global.form.country") + " *",
    validator: "required",
    options: {
      FR: "FR",
    },
  },
  {
    type: "tel",
    name: "phone",
    label: t("global.form.phone") + " *",
    validator: "required",
  },
  {
    type: "checkbox",
    name: "isDefault",
    label: t("global.form.default_address"),
  },
]);

const submit = async () => {
  try {
    if (props.address) {
      await addressStore.updateAddress(props.address.id, { ...formData.value });
    } else {
      await addressStore.createAddress({ ...formData.value });
    }
    success.value = true;
    emit("next");
  } catch (err) {
    error.value = err;
  }
};

watch(
  () => props.address,
  (newAddress) => {
    if (newAddress) {
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = newAddress[key] || formData.value[key];
      });
    } else {
      formData.value.firstName = user.value.firstName || formData.value.firstName;
      formData.value.lastName = user.value.lastName || formData.value.lastName;
      formData.value.phone = user.value.phone || formData.value.phone;
      formData.value.country = user.value.country || formData.value.country;
    }
  },
  { deep: true, immediate: true },
);
</script>

<style lang="scss">
.f-form-address {
  .formkit-input[type="submit"] {
    margin-left: auto;
    margin-right: auto;
  }

  &.is-inline-desktop {
    @include media(">tablet") {
      .formkit-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: var(--f-length-3);
        max-width: calc((var(--fk-max-width-input) * 2) + var(--f-length-3));
      }

      .formkit-actions {
        width: calc((100% - var(--f-length-3)) / 2);
      }

      .formkit-actions {
        grid-column: 1 / -1;
      }

      .formkit-outer {
        margin-bottom: 0;
      }
    }
  }
}
</style>
