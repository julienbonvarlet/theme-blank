<template>
  <component
    :is="tag"
    :to="to"
    :class="[
      'f-field-box',
      colorClass,
      selectedClass,
      disabledClass,
      imageClass,
      textClass,
      sizeClass,
    ]"
    v-bind="attrs"
  >
    <input
      v-if="name"
      v-model="selected"
      type="radio"
      :name="name"
      :required="required"
      :value="value"
    />

    <span class="f-field-box__content">
      <span
        v-if="colorCode"
        class="f-field-box__color"
        :style="{ backgroundColor: colorCode }"
      ></span>
      <FAImage
        v-else-if="image"
        class="f-field-box__image"
        :src="image"
        :alt="label || value"
      />
      <span v-if="label" class="f-field-box__text">
        <slot>{{ label }}</slot>
      </span>
      <slot name="content" />
    </span>

    <FAText v-if="tooltip" size="xs" class="f-field-box__tooltip">{{
      tooltip
    }}</FAText>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, watch, useAttrs } from "vue";
import { FieldBoxSizes } from "../../constants/ui-config";

const emit = defineEmits(["input"]);

const props = withDefaults(
  defineProps<{
    required?: boolean;
    to?: string;
    name?: string;
    value?: string | number;
    colorCode?: string;
    label?: string | number;
    tooltip?: string;
    disabled?: boolean;
    selected?: boolean;
    image?: string;
    size?: (typeof FieldBoxSizes)[string];
  }>(),
  {
    tag: "label",
    required: true,
    size: "s",
  },
);

const selected = ref(props.selected ? props.value : null);

const isSelected = computed(() => props.selected);
const selectedClass = computed(() =>
  selected.value === props.value ? "is-selected" : null,
);
const disabledClass = computed(() => (props.disabled ? "is-disabled" : null));
const colorClass = computed(() => (props.colorCode ? "is-color" : null));
const textClass = computed(() =>
  !props.colorCode && !props.image ? "is-text" : null,
);
const imageClass = computed(() => (props.image ? "is-image" : null));
const sizeClass = computed(() => `is-${props.size}`);

const tag = computed(() =>
  props.name ? "label" : props.to ? "NuxtLink" : "span",
);

watch(
  () => props.selected,
  (newSelected) => {
    selected.value = newSelected ? props.value : null;
  },
);

watch(selected, (newValue) => {
  if (newValue) {
    emit("input", props.value);
  }
});

const attrs = useAttrs();
</script>

<style lang="scss">
.f-field-box {
  --width: var(--f-field-box-s-width);
  --padding: var(--f-field-box-s-padding-x);
  --font-size: var(--f-field-box-s-font-size);
  --font-weight: var(--f-field-box-s-font-weight);
  --border-width: var(--f-field-box-s-border-width);

  &.is-m {
    --width: var(--f-field-box-m-width);
    --padding: var(--f-field-box-m-padding-x);
    --font-size: var(--f-field-box-m-font-size);
    --font-weight: var(--f-field-box-m-font-weight);
    --border-width: var(--f-field-box-m-border-width);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--f-field-box-border-radius);
  border: solid var(--border-width) var(--f-field-box-border-color);
  position: relative;
  cursor: pointer;
  width: fit-content;
  min-width: var(--width);
  height: var(--width);
  font-family: var(--f-font-family-text);
  background-color: var(--f-field-box-background);
  color: var(--f-field-box-color);
  transition:
    border ease 0.2s,
    background ease 0.2s,
    color ease 0.2s;
  $self: &;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    text-transform: var(--f-field-box-text-transform);
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--f-field-box-border-radius);
  }

  &:hover {
    border-color: var(--f-field-box-hover-border-color);
  }

  &.is-selected {
    background-color: var(--f-field-box-selected-background);
    color: var(--f-field-box-selected-color);
    border-color: var(--f-field-box-selected-border-color);
  }

  &.is-color,
  &.is-image {
    #{$self}__content {
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      overflow: hidden;
    }
  }

  &.is-color {
    #{$self}__content {
      border-radius: var(--f-field-box-border-radius);
    }
  }

  &.is-image {
    height: var(--f-length-15);
    width: var(--f-length-10);
    border-radius: 0;

    &.is-disabled {
      img {
        opacity: 0.5;
      }
    }

    #{$self}__content {
      border-radius: 0;
    }

    img {
      height: 100%;
    }
  }

  &.is-disabled {
    pointer-events: none;

    #{$self}__content {
      position: relative;
      color: var(--f-color-text-grey);

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom right,
          transparent calc(50% - 1px),
          var(--f-field-box-border-color) calc(50% - 2px),
          var(--f-field-box-border-color) 50%,
          transparent 50%
        );
      }
    }
  }

  &__text {
    padding: 0 var(--padding);
  }

  &__color {
    display: block;
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  &__tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: var(--f-length-15);
    padding: 3px;
    text-align: center;
    color: var(--f-color-text-dark);
    background-color: var(--f-color-background-very-light);
    pointer-events: none;
    opacity: 0;
    transition: opacity ease 0.2s;
    border: solid 1px var(--f-color-border);
    z-index: var(--z-index-default);

    &:after {
      content: "";
      width: 4px;
      height: 5px;
      border: solid 1px var(--f-color-border);
      border-bottom: 0;
      border-right: 0;
      transform: translate(-50%, -50%) rotate(45deg);
      left: 50%;
      top: 0;
      z-index: var(--z-index-above);
      position: absolute;
      background-color: var(--f-color-background-very-light);
    }
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
  }

  :hover {
    #{$self}__tooltip {
      opacity: 1;
    }
  }
}
</style>
