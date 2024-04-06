<template>
  <div class="fp-product">
    <FALoader v-if="pending" size="l" />
    <div v-else-if="error" class="fp-product__error">
      <FAText :text="$t('pages.product.error')" />
      <FAButton :to="{ name: 'homepage' }" :label="$t('pages.product.cta_back_home')" />
    </div>
    <div v-else>
      <FMBreadcrumb current-page-type="product" :current-page-title="product.title" :previous-page-title="previousPageTitle" />
      <FOProductPresentation :product="product" :choice="choice" @on-choice-change="(value) => updateChoice(value)" />
      <FOProductSuggestions :color="choice.color" :size="choice.size" :gender="choice.gender" :type="choice.type" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { $trackingPlan } = useNuxtApp();

const { product, pending, error, choice, updateChoice } = await usePagesProductId();
const previousPageTitle = usePreviousTitle().previousTitle || t("global.collection");

// Tracking Plan //
if (process.client) {
  $trackingPlan?.purchaseViewProductPage({
    product: product.value,
    choice: choice.value,
  });
}
// Tracking Plan //
</script>

<style lang="scss">
.fp-product {
  &__error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--f-length-3);
    text-align: center;
  }

  & > .f-loader {
    margin: var(--f-margin-section) auto;
    display: block;
  }
}
</style>
