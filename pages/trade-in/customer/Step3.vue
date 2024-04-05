<template>
  <FTTradeIn>
    <FMTradeInStep
      class="f-ti-customer-auth"
      class-child="f-ti-customer-auth__inner"
      max-width="l"
    >
      <div class="f-ti-customer-auth__col">
        <FABack to="/pages/trade-in/customer/2" />

        <div>
          <FATradeInTitle
            :title="$t('trade_in.identification.title')"
            size="s"
          />

          <FALoader v-if="loading" size="m" />

          <FMUserCard v-else-if="user" />

          <div v-else>
            <FAText :text="$t('trade_in.identification.text')" />
            <FMFormCheckEmail
              v-if="!emailChecked"
              @submit="handleEmailSubmit"
            />
            <FMFormLogin
              v-else-if="emailExists"
              :email="email"
              @go-to-register="toggleEmailExists"
            />
            <FMFormRegister
              v-else
              :email="email"
              @go-to-login="toggleEmailExists"
            />
          </div>
        </div>

        <div>
          <FATradeInTitle
            :class="{ 'is-disabled': !user }"
            :title="$t('trade_in.address.title')"
            size="s"
          />
          <FMTradeInAddresses
            v-if="user"
            @next="router.push({ name: 'trade-in-customer-step-4' })"
          />
        </div>
      </div>

      <FMTradeInResume />
    </FMTradeInStep>
  </FTTradeIn>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../stores/userStore";
import { useAuthStore } from "../../../stores/authStore";
import { useTradeInModule } from "../../../stores/tradeInModule";

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const tradeInModule = useTradeInModule();
const { $trackingPlan } = useNuxtApp();

const email = ref<null | string>(null);
const emailChecked = ref(false);
const emailExists = ref(false);
const loading = ref(true);
const user = computed(() => userStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleEmailSubmit = (data) => {
  emailExists.value = data.exist;
  email.value = data.email;
  emailChecked.value = true;
};

const toggleEmailExists = () => {
  emailExists.value = !emailExists.value;
  window.scrollTo({ top: 0 });
};

onMounted(() => {
  if (isAuthenticated.value) {
    userStore.fetchCurrentUser().finally(() => (loading.value = false));
  } else {
    loading.value = false;
  }
});

// Tracking Plan //
if (process.client) {
  $trackingPlan?.tradeinViewUserIdentification();
}
// Tracking Plan //
</script>

<style lang="scss">
.f-ti-customer-auth {
  margin: var(--f-margin-section) 0;
  text-align: left;

  @include media("<=tablet") {
    margin: 0;
  }

  @include media("<desktop") {
    text-align: center;
  }

  @include media(">=desktop") {
    .f-form-message {
      margin-left: 0;
    }
  }

  .f-form-message {
    margin-top: var(--f-length-2);
  }

  &__inner {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    flex-grow: 1;

    & > * {
      margin-bottom: var(--f-length-5);

      @include media("<=tablet") {
        margin-bottom: var(--f-length-3);
      }
    }
  }

  .f-ti-title.is-disabled {
    color: var(--f-color-text-grey);
  }

  .formkit-actions .formkit-outer {
    margin-top: var(--f-length-3);
  }

  @include media(">=desktop") {
    .f-link {
      margin-left: 0;
    }

    .formkit-form {
      .formkit-message,
      .formkit-fieldset,
      button[type="submit"],
      .formkit-wrapper {
        margin-left: 0;
      }
    }

    .f-form-check-email .f-button {
      margin-left: 0;
    }
  }

  .f-form-register {
    .f-link {
      display: none;
    }
  }
}
</style>
