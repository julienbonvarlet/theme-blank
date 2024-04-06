<template>
  <FMSectionContainer class="f-section-icons" :padding-x="true" :margin-y="marginY" :padding-y="paddingY" max-width="l">
    <FMIconInfoList
      :title="title"
      :title-size="titleSize"
      :text="text"
      :subtitle="subtitle"
      :link="link"
      :icons="icons"
      :align="align"
    />
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { TitleSizes } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    title?: string;
    titleSize?: TitleSizes;
    subtitle?: string;
    text?: string;
    link?: Record<string, any>;
    icons: Array;
    paddingY?: boolean;
    marginY: boolean;
    align?: "left" | "center" | "right";
  }>(),
  {
    titleSize: TitleSizes.M,
    marginY: true,
  },
);
</script>
