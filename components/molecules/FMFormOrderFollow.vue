<template>
  <div class="f-form-order-follow">
    <FormKit type="form" :submit-label="$t('pages.order_tracking.button_track_order')" @submit="submitOrderFollow">
      <FormKit v-model="formData.email" :label="$t('global.form.email') + ' *'" type="email" name="email" validator="required|email" />
      <FormKit v-model="formData.orderNumber" :label="$t('pages.order_tracking.order_number') + ' *'" type="text" name="orderNumber" validator="required" />
    </FormKit>
    <FALink :text="$t('pages.order_tracking.button_login')" size="s" to="/account" />
  </div>
</template>
<script setup lang="ts">
const formData = ref({
  orderNumber: "",
});

const auth = useAuthStore();
const router = useRouter();

const submitOrderFollow = async () => {
  try {
    const response = await auth.guestLogin(formData.value.orderNumber);
    localStorage.setItem("orderIdGuest", response.order.split("/").pop());
    localStorage.setItem("authGuest", JSON.stringify(response));
    router.push("/order-details-follow");
  } catch (error) {
    console.error("Erreur lors du suivi d'une commande:", error);
  }
};
</script>

<style lang="scss">
.f-form-order-follow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .formkit-form {
    width: 100%;
    max-width: var(--fk-max-width-input);

    button.formkit-input {
      margin: auto;
    }
  }
}
</style>
