<template>
  <FMSectionContainer
    class="f-section-text"
    :margin-y="marginY"
    :margin-x="marginX"
    :padding-y="paddingY"
    :padding-x="paddingX"
    :max-width="maxWidth"
    v-bind="attrs"
  >
    <FMTextContainer
      :title="title"
      :title-size="titleSize"
      :title-tag="titleTag"
      :text="text"
      :subtitle="subtitle"
      :link1="link1"
      :link2="link2"
    >
      <slot />
    </FMTextContainer>
  </FMSectionContainer>
</template>

<script setup lang="ts">
import type { TitleSizes, TitleTags, WrapperWidths } from "~/types/enums";

defineProps<{
  title: {
    type: String;
    required: false;
  };
  titleSize: {
    type: TitleSizes;
    required: false;
    default: TitleSizes.M;
  };
  titleTag: {
    type: TitleTags;
    required: false;
    default: TitleTags.H2;
  };
  subtitle: {
    type: String;
    required: false;
  };
  text: {
    type: String;
    required: false;
  };
  link1: {
    type: Object;
    required: false;
  };
  link2: {
    type: Object;
    required: false;
  };
  maxWidth: {
    type: WrapperWidths;
    required: false;
    default: WrapperWidths.M;
  };
  marginX: {
    type: Boolean;
    required: false;
  };
  marginY: {
    type: Boolean;
    required: false;
    default: true;
  };
  paddingX: {
    type: Boolean;
    required: false;
    default: true;
  };
  paddingY: {
    type: Boolean;
    required: false;
  };
}>();

const attrs = useAttrs();
</script>
