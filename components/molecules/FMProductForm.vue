<template>
  <form class="f-product-form" @submit.prevent="submit">
    <FMFieldBoxList
      name="size"
      :label="$t('pages.product.labels.size')"
      :fields="sizesFields"
      :selected="selectedAttributes.size"
      :helper="$t('pages.product.size_helper')"
      @on-helper-click="displaySizeGuide()"
      @input="(value) => selectField('size', value)"
    />
    <FMFieldBoxList
      name="color"
      :label="$t('pages.product.labels.color')"
      :fields="colorsFields"
      :selected="selectedAttributes.color"
      @input="(value) => selectField('color', value)"
    />
    <FMFieldBoxList
      name="state"
      :label="$t('pages.product.labels.condition')"
      :fields="stateFields"
      :selected="selectedAttributes.state"
      @input="(value) => selectField('state', value)"
    />
    <FAButton size="l" :label="$t('pages.product.add_button')" />
  </form>
</template>

<script setup lang="ts">
const { $trackingPlan } = useNuxtApp();

const props = defineProps<{
  product: Object;
}>();

const cartStore = useCartStore();
const choices = ref(props.product.choices);

const selectedAttributes = ref({
  color: choices.value?.[0].color,
  size: choices.value?.[0].size,
  state: choices.value?.[0].state,
});

const photos = computed(() => choice?.value?.photos);

const sizes = ref(props.product.size ? [...props.product.size].sort((a, b) => a - b) : []);
const states = ref(props.product.state ? [...props.product.state].sort((a, b) => a - b) : []);
const colors = ref(props.product.color ? [...props.product.color].sort((a, b) => a - b) : []);

const sizesFields = computed(() =>
  sizes.value.map((size) => ({
    label: size,
    value: size,
  })),
);

const colorsFields = computed(() =>
  colors.value.map((color) => ({
    value: color,
    image: choices?.value?.find((c) => c.color === color)?.photos?.[0],
    disabled: !choices.value?.find((c) => c.size == selectedAttributes.value.size && c.color === color),
  })),
);

const stateFields = computed(() =>
  states.value.map((state) => ({
    label: state,
    value: state,
    disabled: !choices.value?.find(
      (c) => c.size == selectedAttributes.value.size && c.color == selectedAttributes.value.color && c.state === state,
    ),
  })),
);

const choice = computed(() =>
  choices.value?.find(
    (x) =>
      x.state === selectedAttributes.value.state &&
      x.color === selectedAttributes.value.color &&
      x.size === selectedAttributes.value.size,
  ),
);

const displaySizeGuide = () => {
  console.log("Afficher le guide des tailles");
};

const selectField = (name, value) => {
  selectedAttributes.value[name] = value;
};

const submit = async () => {
  if (choice?.value) {
    await cartStore.addToCart({
      ...choice.value,
      originPrice: props.product.originPrice,
      title: props.product.title,
    });

    // Tracking Plan //
    if (process.client) {
      $trackingPlan?.purchaseAddToCart({
        product: props.product,
        choice: choice.value,
        cartValue: cartStore.cartOrder.itemsTotal,
      });
    }
    // Tracking Plan //
  }
};

const emit = defineEmits(["onChoiceChange"]);
watch(choice, (newValue) => {
  if (newValue) {
    emit("onChoiceChange", newValue);
  } else {
    // If no choice exist with actual values, we select by default an other choice
    const { size, state, color } = selectedAttributes.value;
    const newChoice =
      choices?.value?.find((c) => c.size === size && c.color === color && c.state === state) ||
      choices.value?.find((c) => c.size === size && c.color === color) ||
      choices.value?.find((c) => c.size === size) ||
      choices.value?.[0];
    selectedAttributes.value.size = newChoice.size;
    selectedAttributes.value.color = newChoice.color;
    selectedAttributes.value.state = newChoice.state;
  }
});
</script>

<style lang="scss">
.f-product-form {
  display: flex;
  flex-direction: column;
  gap: var(--f-length-2);

  .f-button {
    margin-top: var(--f-length-1);
    width: 100%;
  }
}
</style>
