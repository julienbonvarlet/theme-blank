<template>
  <div class="f-form-check-email">
    <FormKit v-model="formData" type="form" @submit="submit">
      <FormKit
        type="email"
        name="email"
        :label="$t('global.form.email')"
        validator="required|email"
        :help="!emailExist && emailIsValid && emailChecked ? $t('account.identification.email_doesnt_exist') : null"
        :suffix-icon="loading ? 'spinner' : null"
      />
      <div v-if="emailChecked && emailIsValid" class="f-form-check-email__cta">
        <FAButton v-if="emailExist" type="submit" :label="$t('account.identification.login.button')" />
        <FAButton v-else type="submit" :label="$t('account.identification.register.button')" />
        <FALink v-if="guest" :text="$t('pages.checkout.identification.continue_as_guest')" @click.prevent="invite" />
      </div>
    </FormKit>

    <div class="f-form-check-email__sso">
      <FAButton :type="ButtonColors.SECONDARY" :icon="IconNames.SsoGoogle" :label="$t('account.identification.login.sso_google')" icon-position="left" @click.prevent="connectSSO('google')" />
      <FAButton :type="ButtonColors.SECONDARY" :icon="IconNames.SsoFacebook" :label="$t('account.identification.login.sso_facebook')" icon-position="left" @click.prevent="connectSSO('facebook')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ButtonColors, IconNames } from "~/types/enums";
const emit = defineEmits(["submit"]);
const { checkEmailExists, connectSSO } = useAuthStore();
const formData = ref({ email: "" });
const emailExist = ref(false);
const loading = ref(false);
const emailChecked = ref(false);

defineProps<{
  guest?: boolean;
}>();

const submit = () => {
  emit("submit", {
    email: formData.value.email,
    exist: emailExist.value,
  });
};

const invite = () => {
  emit("submit", {
    email: formData.value.email,
    exist: false,
    invitation: true,
  });
};

const checkEmail = async (email: string) => {
  try {
    await checkEmailExists(email.trim());
    emailChecked.value = true;
    emailExist.value = true;
    loading.value = false;
    if (emailExist.value) {
      submit();
    }
  } catch (e) {
    console.log("ERROR", e);
    emailChecked.value = true;
    emailExist.value = false;
    loading.value = false;
  }
};

const email = computed(() => formData.value?.email?.trim());
const emailIsValid = computed(() => {
  const emailStr = email.value?.trim();
  return emailStr && emailStr.includes("@") && emailStr.includes(".");
});

watch(email, (value) => {
  emailChecked.value = false;
  emailExist.value = false;
  loading.value = true;
  setTimeout(() => {
    if (formData.value?.email === value) {
      checkEmail(value);
    }
  }, 1000);
});
</script>

<style lang="scss">
.f-form-check-email {
  @keyframes anim {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .formkit-outer[data-type="submit"] {
    display: none;
  }

  .formkit-suffix-icon svg {
    animation: anim infinite linear 1s;
  }

  .formkit-help {
    text-align: center;
  }

  &__sso {
    margin-top: var(--f-length-3);
    display: flex;
    flex-direction: column;
    gap: var(--f-length-1);
    align-items: center;
  }

  &__cta {
    display: flex;
    gap: var(--f-length-2);
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
