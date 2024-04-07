<template>
  <div class="f-checkout-auth">
    <FABack @click.prevent="clickBack" />
    <FATitle size="s" :title="$t('pages.checkout.identification.title')" />
    <FAText v-if="!user" :text="$t('pages.checkout.identification.text')" />
    <FMUserCard v-if="user" />
    <FMFormCheckEmail v-else-if="!emailChecked" :guest="true" @submit="handleEmailSubmit" />
    <FMFormGuest v-else-if="invitation" :email="email" />
    <FMFormLogin v-else-if="emailExists" :email="email" @go-to-register="toggleEmailExists" />
    <FMFormRegister v-else :email="email" @go-to-login="toggleEmailExists" />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();

const props = defineProps<{
  displayBilling?: boolean;
}>();

const email = ref<null | string>(null);
const emailChecked = ref(false);
const emailExists = ref(false);
const user = computed(() => userStore.user);
const invitation = ref(false);

const toggleEmailExists = () => {
  emailExists.value = !emailExists.value;
  window.scrollTo({ top: 0 });
};

const handleEmailSubmit = (data) => {
  invitation.value = data.invitation;
  emailExists.value = data.exist;
  email.value = data.email;
  emailChecked.value = true;
};

const clickBack = () => {
  if (emailChecked.value) {
    emailChecked.value = false;
    invitation.value = false;
    emailExists.value = false;
  } else {
    navigateTo("/cart");
  }
};
</script>

<style lang="scss">
.f-checkout-auth {
  .f-form-register fieldset {
    margin: 0;
  }

  @include media(">=desktop") {
    .f-form-guest,
    .f-form-register {
      max-width: 100%;

      .formkit-form {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--f-length-3);
      }

      .formkit-actions,
      .formkit-outer[data-type="radio"],
      .formkit-outer[data-type="checkbox"] {
        grid-column: 1 / -1;
      }

      .formkit-outer {
        margin-bottom: 0;
      }

      .f-link,
      .formkit-actions {
        max-width: calc((100% - var(--f-length-3)) / 2);
      }

      .f-link {
        text-align: center;
        width: 100%;
        justify-content: center;
        display: flex;
        margin: var(--f-length-2) 0 0;
      }
    }
  }
}
</style>
