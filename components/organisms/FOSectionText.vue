<template>
  <FMSectionContainer class="f-section-text" :margin-y="marginY" :margin-x="marginX" :padding-y="paddingY" :padding-x="paddingX" :max-width="maxWidth" v-bind="attrs">
    <FMTextContainer :title="title" :title-size="titleSize" :title-tag="titleTag" :text="text" :subtitle="subtitle" :link1="link1" :link2="link2">
      <slot />
    </FMTextContainer>
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { TitleSizes, TitleTags, WrapperWidths } from "~/types/enums";

withDefaults(
  defineProps<{
    title?: string;
    titleSize?: TitleSizes;
    titleTag?: TitleTags;
    subtitle?: string;
    text?: string;
    link1?: { label: string; to: string, type: string };
    link2?: { label: string; to: string, type: string };
    maxWidth?: WrapperWidths;
    marginX?: boolean;
    marginY?: boolean;
    paddingX?: boolean;
    paddingY?: boolean;
  }>(),
  {
    titleSize: TitleSizes.M,
    titleTag: TitleTags.H2,
    maxWidth: WrapperWidths.M,
    marginY: true,
    paddingX: true,
  },
);

const attrs = useAttrs();
</script>
