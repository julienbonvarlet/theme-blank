<template>
  <div class="f-tag-status" :class="[colorClass]">
    <FAText size="s">
      <slot>{{ text }}</slot>
    </FAText>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    value?: string;
    color?: "dark" | "light" | "success" | "error";
  }>(),
  {}
);

const colorsByStatus = {
  dark: [
    "confirmed",
    "received",
    "delivred",
    "refunded",
    "validated",
    "treated",
    "paid",
    "partially_accepted",
  ],
  light: [
    "doing",
    "waiting",
    "sended",
    "sent",
    "async",
    "preparing",
    "draft",
    "shipped",
    "received",
    "controlling",
  ],
  success: ["validated", "valid", "accepted", true],
  error: [
    "refused",
    "cancelled",
    false,
    "rejected",
    "canceled",
    "partially_refunded",
    "refunded",
    "requires_payment_method",
    "cancel",
  ],
};

const colorClass = computed(() => {
  if (props.color) {
    return `is-${props.color}`;
  }
  for (const color in colorsByStatus) {
    if (colorsByStatus[color].includes(props.value)) {
      return `is-${color}`;
    }
  }
  return "is-light";
});
</script>

<style lang="scss">
.f-tag-status {
  padding: var(--f-length-1) var(--f-length-2);
  min-width: var(--f-length-12);
  text-align: center;
  display: block;
  width: fit-content;

  &.is-light {
    background-color: var(--f-color-background-light);
    color: var(--f-color-text-grey);
  }

  &.is-success {
    background-color: var(--f-color-background-success);
    color: var(--f-color-text-success);
  }

  &.is-error {
    background-color: var(--f-color-background-error);
    color: var(--f-color-text-error);
  }

  &.is-dark {
    background-color: var(--f-color-background-dark);
    color: var(--f-color-text-light);
  }
}
</style>
