<template>
  <FOSectionText
    class="f-newsletter"
    max-width="m"
    :padding-y="true"
    :padding-x="true"
    :margin-y="false"
    :margin-x="false"
    :title="$t('sections.newsletter.title')"
    :text="$t('sections.newsletter.text')"
    align="center"
  >
    <FormKit type="form" @submit="submit">
      <FMFormMessage v-if="success" type="success" :text="$t('sections.newsletter.success_message')" />
      <FMFormMessage v-if="error" type="error" :text="$t('sections.newsletter.error_message')" />
      <div v-if="!success" class="f-newsletter__field">
        <FormKit name="email" type="email" :value="email" validation="required|email" :help="$t('sections.newsletter.help')" />
        <FAButton :submit="true" :label="$t('sections.newsletter.button')" :is-loading="loading" />
      </div>
    </FormKit>
  </FOSectionText>
</template>

<script setup lang="ts">
const { getUser } = useAuthUser();
const userStore = useUserStore();
const { $API } = useNuxtApp();
const config = useRuntimeConfig();

const userEmail = computed(() => userStore.user?.email);
const email = ref<null | string>(null);
const loading = ref(false);
const error = ref(false);
const success = ref(false);

const formData = ref({
  email: null,
  locale: "fr_FR",
  country: "string",
  gender: "string",
  confirm: true,
});

watch(
  userEmail,
  (value) => {
    email.value = value;
  },
  { immediate: true },
);

const submit = async (formData) => {
  loading.value = true;
  success.value = false;
  error.value = false;
  try {
    await $API.marketingSubscription.apiCustomerMarketingSubscriptionsPost({
      email: formData.email,
      locale: "fr_FR",
      country: "FR",
      confirm: true,
    });
    success.value = true;
    loading.value = false;
  } catch {
    error.value = true;
    loading.value = false;
  }
};

onMounted(() => {
  getUser();
});
</script>

<style lang="scss">
.f-newsletter {
  background-color: var(--f-color-background-light);

  .formkit-outer {
    margin: 0;
  }

  &__field {
    display: flex;
    gap: var(--f-length-1);
    align-items: flex-start;
    margin: var(--fk-margin-outer);
    justify-content: center;
    text-align: left;
  }

  .formkit-actions {
    display: none;
  }

  .f-form-message {
    margin: var(--f-length-3) auto;
  }
}
</style>
