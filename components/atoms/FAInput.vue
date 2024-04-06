<template>
  <input
    class="f-input"
    :type="type"
    :name="name"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    :step="step"
    :pattern="pattern"
    :autocomplete="autocomplete"
    :class="[disabledClass, errorClass]"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: string | number;
    type?: string;
    name?: string;
    min?: string | number;
    max?: string | number;
    placeholder?: string;
    step?: string | number;
    pattern?: string;
    autocomplete?: boolean;
    disabled?: boolean;
    error?: boolean;
  }>(),
  {
    type: "text",
    autocomplete: true,
  }
);

const disabledClass = computed(() => (props.disabled ? "is-disabled" : ""));
const errorClass = computed(() => (props.error ? "is-invalid" : ""));

const emit = defineEmits(["change"]);
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit("change", input.value);
};
</script>

<style lang="scss">
.f-input {
  border: var(--input-border);
  color: var(--input-color);
  display: flex;
  align-items: center;
  text-align: left;
  padding: 4px var(--input-padding-x);
  min-height: var(--input-min-height);
  background-color: var(--input-background-color);
  transition:
    color ease 0.2s,
    border-color ease 0.2s;
  outline: none;
  box-shadow: none;
  overflow: hidden;
  border-radius: var(--input-border-radius);

  &,
  &::placeholder {
    font-size: var(--input-font-size);
    font-weight: var(--input-font-weight);
  }

  &::placeholder {
    color: var(--f-color-grey);
  }

  &:focus {
    border-color: var(--input-hover-border-color);
  }

  &.is-invalid {
    border-color: var(--f-color-text-error);
  }

  &.is-disabled {
    pointer-events: none;
    opacity: 0.3;
    user-select: none;
  }
}
</style>
