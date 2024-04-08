<template>
  <FAText v-if="show" :size="TextSizes.XS" class="f-discount-tag" :class="[promotionalClass]">
    {{ content }}
  </FAText>
</template>

<script setup lang="ts">
import { TextSizes } from "~/types/enums";

const { t } = useI18n();

const props = defineProps<{
  originalPrice?: Number;
  salePrice?: Number;
  promotionalOffer?: Boolean;
  text?: string;
}>();

const content = computed(() => {
  if (props.promotionalOffer) {
    return t("promotional_offers.20");
  } else if (props.originalPrice && props.originalPrice > props.salePrice) {
    const reduction = ((props.originalPrice - props.salePrice) / props.originalPrice) * 100;
    return `- ${reduction.toFixed(0)}%`;
  }
  return null;
});

const show = computed(() => {
  if (props.text || props.promotionalOffer) {
    return true;
  }
  return props.originalPrice && props.originalPrice > props.salePrice;
});

const promotionalClass = computed(() => (props.promotionalOffer ? "is-promo-offer" : ""));
</script>

<style lang="scss">
.f-discount-tag {
  background-color: var(--f-discount-tag-background);
  color: var(--f-discount-tag-color);
  border: solid 1px var(--f-discount-tag-border);
  min-height: var(--f-discount-tag-height);
  padding: 2px var(--f-discount-tag-padding-x);
  width: fit-content;
  border-radius: var(--f-discount-tag-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &.is-promo-offer {
    color: var(--f-color-promotion);
    border-color: var(--f-color-promotion);
    background-color: var(--f-color-background-very-light);
  }
}
</style>
