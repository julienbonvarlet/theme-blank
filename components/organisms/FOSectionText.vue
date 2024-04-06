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
const props = withDefaults(
  defineProps<{
    title?: string;
    titleSize?: (typeof TitleSizes)[string];
    titleTag?: (typeof TitleTags)[string];
    subtitle?: string;
    text?: string;
    link1?: Record<string, any>;
    link2?: Record<string, any>;
    maxWidth?: (typeof WrapperWidths)[string];
    marginY?: boolean;
    marginX?: boolean;
    paddingX?: boolean;
    paddingY?: boolean;
  }>(),
  {
    titleSize: "m",
    titleTag: "h2",
    maxWidth: "m",
    marginY: true,
    paddingX: true,
  },
);

const attrs = useAttrs();
</script>
