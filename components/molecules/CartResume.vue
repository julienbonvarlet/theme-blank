<template>
  <div class="f-cart-resume">
    <table>
      <tr v-if="subtotal" class="f-cart-resume__subtotal">
        <td>
          <FAText size="s">{{ $t("global.subtotal") }}</FAText>
        </td>
        <td>
          <FAText size="s">{{ subtotalPrice }}</FAText>
        </td>
      </tr>
      <tr v-if="discountTotal" class="f-cart-resume__discount">
        <td>
          <FAText size="s">{{ $t("global.promotion") }}</FAText>
        </td>
        <td>
          <FAText size="s">- {{ discountPrice }}</FAText>
        </td>
      </tr>
      <tr v-for="line in lines" :key="line.label">
        <td>
          <FAText size="s" :weight="line.bold ? 'bold' : null">{{
            line.label
          }}</FAText>
        </td>
        <td>
          <FAText size="s" :weight="line.bold ? 'bold' : null">{{
            line.value
          }}</FAText>
        </td>
      </tr>
      <tr
        v-if="shippingMethod || shippingTotal"
        class="f-cart-resume__shipping"
      >
        <td>
          <FAText size="s">{{ $t("global.shipping") }}</FAText>
          <FAText v-if="shippingMethod" size="xs" :is-grey="true">
            {{ shippingMethod }} {{ shippingDelay ? `: ${shippingDelay}` : "" }}
          </FAText>
        </td>
        <td>
          <FAText size="s">{{
            shippingTotal > 0 ? shippingPrice : $t("global.free")
          }}</FAText>
        </td>
      </tr>
      <tr v-if="total && total > 0" class="f-cart-resume__total">
        <td>
          <FAText size="m" weight="bold">{{ $t("global.total") }}</FAText>
        </td>
        <td>
          <FAText size="m" weight="bold">{{ totalPrice }}</FAText>
        </td>
      </tr>
    </table>
    <slot />
    <FAButton v-if="primaryButton" v-bind="primaryButton" size="l" />
    <FAButton
      v-if="secondaryButton"
      class="f-cart-resume__continue"
      v-bind="secondaryButton"
      size="m"
      type="secondary"
    />
  </div>
</template>

<script lang="ts" setup>
import { usePriceFormatter } from "../../composables/usePriceFormatter";
import { computed } from "vue";
const { formatPrice } = usePriceFormatter();

interface Line {
  label: string;
  value: string;
  bold: boolean;
}

const props = defineProps<{
  subtotal?: number;
  total?: number;
  discountTotal?: number;
  shippingMethod?: string;
  shippingDelay?: string;
  shippingTotal?: number;
  primaryButton?: Object;
  secondaryButton?: Object;
  lines?: Line[];
}>();

const totalPrice = computed(() => formatPrice(props.total));
const subtotalPrice = computed(() => formatPrice(props.subtotal));
const shippingPrice = computed(() => formatPrice(props.shippingTotal));
const discountPrice = computed(() =>
  props.discountTotal ? formatPrice(props.discountTotal) : null,
);
</script>

<style lang="scss">
.f-cart-resume {
  display: flex;
  gap: var(--f-length-2);
  text-align: center;
  flex-direction: column;

  td {
    text-align: left;

    &:last-of-type {
      text-align: right;
    }
  }

  tr:not(:last-of-type) td {
    padding-bottom: var(--f-length-1);
  }

  .f-button {
    min-width: auto;
    width: 100%;
  }

  &__discount {
    color: var(--f-color-text-success);
  }

  &__total {
    p {
      margin-top: var(--f-length-1);
      padding-top: var(--f-length-2);
      border-top: solid 1px var(--f-color-border);
    }
  }
}
</style>
