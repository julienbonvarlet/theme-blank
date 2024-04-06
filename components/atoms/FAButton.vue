<template>
  <component :is="tag" :type="submitAttribute" :disabled="isDisabled" :to="to" class="f-button" :class="[sizeClass, typeClass, animationClass, disabledClass, loadingClass]" v-bind="attrs">
    <span class="f-button__content">
      <FAIcon v-if="icon && iconPosition === 'left'" :icon="icon" />
      <span v-if="label" class="f-button__text">
        <slot>{{ label }}</slot>
      </span>
      <FALoader v-if="isLoading" />
      <FAIcon v-else-if="icon && iconPosition != 'left'" :icon="icon" />
    </span>

    <span class="f-button__bg"></span>
  </component>
</template>

<script setup lang="ts">
import { ButtonColors, ButtonSizes, type IconNames } from '~/types/enums';

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: ButtonSizes;
    type?: ButtonColors;
    to?: string | object;
    icon?: IconNames;
    iconPosition?: "left" | "right";
    submit?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
  }>(),
  {
    size: ButtonSizes.M,
    type: ButtonColors.PRIMARY,
    iconPosition: "right",
  },
);

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const attrs = useAttrs();
const sizeClass = computed(() => `is-${props.size}`);
const typeClass = computed(() => `is-${props.type}`);
const animationClass = computed(() => "is-anim-text");
const submitAttribute = computed(() => (props.submit ? "submit" : null));
const disabledClass = computed(() => (props.isDisabled ? "is-disabled" : null));
const loadingClass = computed(() => (props.isLoading ? "is-loading" : null));
const tag = computed(() => (props.to ? NuxtLink : "button"));
</script>

<style lang="scss">
.f-button {
  --button-background: var(--button-primary-background);
  --button-color: var(--button-primary-color);
  --button-border: var(--button-primary-border);
  --button-hover-background: var(--button-primary-hover-background);
  --button-hover-color: var(--button-primary-hover-color);
  --button-hover-border: var(--button-primary-hover-border);
  transition:
    opacity ease 0.2s,
    color ease 0.2s;
  text-decoration: none;
  font-family: var(--button-font-family);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--button-hover-background);
  color: var(--button-color);
  border: var(--button-border);
  width: fit-content;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  user-select: none;
  $self: &;

  &__bg {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--button-background);
  }

  &__content {
    position: relative;
    z-index: var(--z-index-above);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  @each $size in ("l", "m", "s") {
    &.is-#{$size} {
      font-size: var(--button-#{$size}-font-size);
      font-weight: var(--button-#{$size}-font-weight);
      letter-spacing: var(--button-#{$size}-letter-spacing);
      text-transform: var(--button-#{$size}-text-transform);
      border-radius: var(--button-#{$size}-border-radius);
      padding: 4px var(--button-#{$size}-padding-x);
      min-height: var(--button-#{$size}-min-height);
      min-width: var(--button-#{$size}-min-width);

      .f-loader {
        width: var(--button-#{$size}-icon-size);
        height: var(--button-#{$size}-icon-size);
      }
    }
  }

  .f-icon {
    font-size: 1.4rem;
  }

  &.is-s {
    .f-icon {
      font-size: 1.2rem;
    }
  }

  @each $type in ("primary", "secondary", "tertiary", "error", "success") {
    &.is-#{$type} {
      --button-background: var(--button-#{$type}-background);
      --button-hover-background: var(--button-#{$type}-hover-background);
      --button-color: var(--button-#{$type}-color);
      --button-hover-color: var(--button-#{$type}-hover-color);
      --button-border: var(--button-#{$type}-border);
      --button-hover-border: var(--button-#{$type}-hover-border);

      background: var(--button-#{$type}-background);
      color: var(--button-#{$type}-color);

      &:hover {
        background: var(--button-#{$type}-hover-background);
        color: var(--button-#{$type}-hover-color);
      }
    }
  }

  &:hover {
    color: var(--button-hover-color);
    border: var(--button-hover-border);
  }

  &.is-no-anim {
    &:hover {
      #{$self}__bg {
        display: none;
      }
    }
  }

  &.is-anim-text,
  &.is-fade {
    #{$self}__bg {
      transition: opacity ease 0.2s;
    }

    &:hover {
      #{$self}__bg {
        opacity: 0;
      }
    }
  }

  &.is-translationY {
    transform-origin: top;

    #{$self}__bg {
      transition: transform ease-in-out 0.3s;
    }

    &:hover {
      #{$self}__bg {
        transform-origin: bottom;
        transform: translateY(100%);
      }
    }
  }

  &.is-translationX {
    transform-origin: left;

    #{$self}__bg {
      transition: transform ease-in-out 0.3s;
    }

    &:hover {
      #{$self}__bg {
        transform-origin: right;
        transform: translateX(100%);
      }
    }
  }

  &.is-anim-text {
    @keyframes animBtnText {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(10px);
        opacity: 0;
      }
      51% {
        transform: translateY(-10px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    &:hover {
      #{$self}__content {
        animation: animBtnText 0.5s ease-in-out forwards;
      }
    }
  }

  &.is-disabled,
  &:disabled {
    pointer-events: none;
    opacity: 0.8;

    #{$self}__text {
      opacity: 0.5;
    }
  }

  &.is-loading {
    pointer-events: none;

    @keyframes animBtnLoading {
      from {
        opacity: 0.5;
      }
      to {
        opacity: 0.2;
      }
    }

    #{$self}__text {
      animation: animBtnLoading ease-in-out alternate-reverse infinite 0.6s;
    }
  }
}
</style>
