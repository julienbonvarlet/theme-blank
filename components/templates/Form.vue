<template>
  <FOSectionText class="ft-form" :title="title">
    <FMFormMessage v-if="error" type="error" :text="error" />
    <FMFormMessage v-if="success" type="success" :text="success" />

    <FormKit
      type="form"
      :submit-label="button || $t('global.validate')"
      @submit="submit"
    >
      <FormKit
        v-for="field in fields"
        :key="field"
        v-bind="field"
        @suffix-icon-click="(node) => suffiIconClick(node, field.type)"
      />
    </FormKit>

    <slot />
  </FOSectionText>
</template>

<script setup lang="ts">
import { useToggleFieldPasswordType } from "../../composables/useFieldPasswordToggleType";

const { togglePasswordFieldType } = useToggleFieldPasswordType();

const error = ref<boolean | string>(false);
const success = ref<boolean | string>(false);

const emit = defineEmits(["handleSuccess", "handleError"]);

const props = defineProps<{
  title: string;
  fields: any[];
  submitFunction: any;
  button?: string;
  parameter1?: string | number | object;
  parameter2?: string | number | object;
  successMessage?: string;
  errorMessage?: string;
}>();

const suffiIconClick = (node, type) => {
  if (type === "password") {
    togglePasswordFieldType(node);
  }
};

const submit = async (formData) => {
  try {
    const param1 = props.parameter1 || formData;
    const param2 = props.parameter1 ? formData : props.parameter2;
    const data = await props.submitFunction(param1, param2);
    success.value = props.successMessage;
    emit("handleSuccess", data);
  } catch (err) {
    error.value = props.errorMessage || err;
    emit("handleError");
  }
};
</script>

<style lang="scss">
.ft-form {
  text-align: center;

  .f-link,
  [data-type="submit"] button.formkit-input,
  .formkit-wrapper,
  .formkit-fieldset {
    margin-right: auto;
    margin-left: auto;
  }

  .f-link {
    justify-content: center;
  }

  .formkit-form {
    margin-top: var(--f-length-5);
  }

  .f-richtext {
    margin-bottom: var(--f-length-3);
  }
}
</style>
