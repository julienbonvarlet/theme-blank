<template>
  <div
    class="f-promo-code-input"
    :class="{
      'is-loading': loading,
      'is-error': error,
      'is-success': success,
    }"
  >
    <FAFieldTitle>{{ $t("global.form.promo_code") }}</FAFieldTitle>
    <FormKit
      v-model="model"
      name="promotionCode"
      type="text"
      :errors="error ? [$t('global.form.promo_code_error')] : null"
      :suffix-icon="icon"
      @suffix-icon-click="model = ''"
    />
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();

const lastCode = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref(false);

const discountTotal = computed(() => cartStore.cartOrder?.discountTotal);

const icon = computed(() => {
  if (loading.value) {
    return "spinner";
  }
  if (error.value) {
    return "close";
  }
  if (success.value) {
    return "check";
  }
  if (model.value?.length && discountTotal.value && discountTotal.value > 0) {
    return "check";
  }
  return null;
});

const model = computed({
  get: () => cartStore.promotionalCode,
  set: (value: string) => {
    lastCode.value = value;
    success.value = false;
    error.value = false;
    loading.value = true;
    setTimeout(() => {
      if (value === lastCode.value) {
        applyCode(value?.trim() || "");
      }
    }, 1000);
  },
});

const applyCode = async (code) => {
  try {
    await cartStore.applyPromotionalCode(code);
    if (code?.length) {
      success.value = true;
    }
    loading.value = false;
  } catch (err) {
    if (code?.length) {
      error.value = true;
    }
    loading.value = false;
  }
};

onBeforeUnmount(() => {
  // On supprime le code promo si la dernière tentative était erroné
  if (error.value && model.value?.length) {
    cartStore.resetPromotionalCode();
  }
});
</script>

<style lang="scss">
.f-promo-code-input {
  margin-bottom: var(--f-length-3);
  --fk-max-width-input: 100%;

  @keyframes anim {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .formkit-outer {
    width: 100%;
    margin: 0;
  }

  .formkit-inner {
    background: var(--f-color-background-very-light);
    margin-top: var(--f-length-1);
  }

  &.is-loading {
    .formkit-suffix-icon svg {
      animation: anim infinite linear 1s;
    }
  }

  &.is-error {
    .formkit-suffix-icon {
      cursor: pointer;
      svg {
        color: var(--f-color-text-error);
      }
    }
  }

  &.is-success {
    .formkit-suffix-icon svg {
      color: var(--f-color-text-success);
    }
  }
}
</style>
