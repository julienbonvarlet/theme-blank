<template>
  <div class="f-text-container" :class="[alignClass]" v-bind="attrs">
    <FARichtext>
      <FATitle v-if="title" :size="titleSize" :tag="titleTag">{{ title }}</FATitle>
      <FASubtitle v-if="subtitle">{{ subtitle }}</FASubtitle>
      <span v-if="text" v-html="text"></span>
    </FARichtext>
    <slot />
    <FMCtaContainer v-if="link1 || link2" class="f-text-container__cta-container" :link1="link1" :link2="link2" :cta-appearance="ctaAppearance" />
  </div>
</template>

<script setup lang="ts">
import { TitleSizes, TitleTags } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    text?: string;
    titleSize?: TitleSizes;
    titleTag?: TitleTags;
    ctaAppearance?: "button" | "link";
    align?: "left" | "center" | "right";
    link1?: Record<string, any>;
    link2?: Record<string, any>;
  }>(),
  {
    titleSize: TitleSizes.M,
    ctaAppearance: "button",
    titleTag: TitleTags.H2,
  },
);

const alignClass = computed(() => `is-${props.align}`);

const attrs = useAttrs();
</script>

<style lang="scss">
.f-text-container {
  $self: &;

  &.is-left {
    text-align: left;
  }

  &.is-center {
    text-align: center;

    #{$self}__cta-container {
      margin-right: auto;
      margin-left: auto;
    }
  }

  &.is-right {
    text-align: right;

    #{$self}__cta-container {
      margin-right: 0;
      margin-left: auto;
    }
  }

  &__cta-container {
    width: fit-content;
    margin-top: var(--richtext-margin-l);
  }

  .f-icon-info-list__content {
    margin: var(--richtext-margin-l) auto;
  }
}
</style>
