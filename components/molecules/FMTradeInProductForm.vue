<template>
  <div class="f-ti-product-form">
    <FMTradeInError v-if="error" @next="reset" />

    <FMTradeInProductFormReference v-else-if="step === 0" @next="submitRef" />

    <FALoader v-else-if="!sizes || !colors" size="m" />

    <FMTradeInFields
      v-else-if="step === 1"
      key="size"
      :title="$t('trade_in.add_product.size.title')"
      type="text"
      name="size"
      :values="sizes"
      :model="article.size"
      @input="(value) => setArticle('size', value)"
      @next="setStep(2)"
      @back-to-sku="setSku"
    />

    <FMTradeInFields
      v-else-if="step === 2"
      key="color"
      :title="$t('trade_in.add_product.color.title')"
      type="text"
      name="color"
      :values="colors"
      :model="article.color"
      @input="(value) => setArticle('color', value)"
      @next="setStep(3)"
      @back-to-sku="setSku"
    />

    <FMTradeInFields
      v-else-if="step === 3"
      key="state"
      :title="$t('trade_in.add_product.condition.title')"
      type="state"
      name="state"
      :values="conditions"
      :model="article.condition"
      @input="(value) => setArticle('condition', value)"
      @next="confirm"
      @back-to-sku="setSku"
    />

    <FALoader v-else size="m" />

    <ul class="f-ti-sticky-recap">
      <template v-for="(step, i) in recapSteps" :key="step">
        <li v-if="i !== 0">
          <FAIcon icon="right" />
        </li>
        <li :class="{ 'is-valid': step.valid }" @click.prevent="setStep(i)">
          <FAText :text="step.title" :is-grey="true" size="s" weight="light" />
          <FAText :text="step.value" size="m" weight="bold" />
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["next"]);

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { $trackingPlan } = useNuxtApp();
const tradeInModule = useTradeInModule();

const error = ref(false);

const colors = computed(() => tradeInModule.colors);
const sizes = computed(() => tradeInModule.sizes);
const conditions = computed(() => tradeInModule.conditions);
const article = computed(() => tradeInModule.article);
const step = computed(() => Number(route.query.step || 0));
const recapSteps = computed(() =>
  ["sku", "size", "color", "condition"].map((name) => ({
    title: t(`trade_in.add_product.${name}.name`),
    value:
      name === "condition" && article.value.condition
        ? t(`trade_in.add_product.condition.${article.value.condition}`)
        : article.value[name] || "-",
    valid: !!article.value[name],
  })),
);

const submitRef = () => {
  tradeInModule.getSizesAndColors();
  setStep(1);
};

const setArticle = (name, value) => {
  tradeInModule.setArticle(name, value);
};

const confirm = async () => {
  setStep(4);
  try {
    await tradeInModule.addToCart();
    emit("next");
  } catch {
    error.value = true;
  }
};

const setStep = (value) => {
  router.push({ query: { step: value } });
};

const setSku = () => {
  tradeInModule.setSku();
  setStep(0);
};

const reset = () => {
  tradeInModule.reset();
  setStep(0);
  error.value = false;
};

onMounted(() => {
  if (step.value === 0 && article.value.sku) {
    tradeInModule.getSku();
  } else if (step.value > 0) {
    tradeInModule.getSizesAndColors();
    if (!article.value.sku) {
      setStep(0);
    } else if (step.value === 2 && !article.value.size) {
      setStep(1);
    } else if (step.value === 3 && !article.value.color) {
      setStep(2);
    } else if (step.value === 4 && !article.value.condition) {
      setStep(3);
    }
  }
});

// Tracking Plan //
if (process.client) {
  $trackingPlan?.tradeinViewProductIdentification();
}
// Tracking Plan //
</script>

<style lang="scss">
.f-ti-sticky-recap {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fff;
  border-top: solid 1px var(--f-color-border);
  padding: var(--f-length-2) var(--f-margin-page);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--f-length-4);
  text-align: center;
  user-select: none;

  @include media("<tablet") {
    gap: 0;
    justify-content: space-evenly;
  }

  .f-icon {
    color: var(--f-color-text-grey);
  }

  li {
    &:not(.is-valid) {
      pointer-events: none;
    }

    &.is-valid {
      cursor: pointer;
    }
  }
}
</style>
