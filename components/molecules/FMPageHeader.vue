<template>
  <FMSectionContainer class="f-page-header" :padding-y="true" :padding-x="true">
    <FATitle :tag="TitleTags.H2" :size="TitleSizes.L">{{ title }}</FATitle>
    <FSubtitle v-if="subtitle" :text="subtitle" :tag="'h3'"></FSubtitle>
  </FMSectionContainer>
</template>
<script setup lang="ts">
import { TitleTags, TitleSizes } from "~/types/enums";

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.f-page-header {
  text-align: center;
  .f-section-container__inner {
    padding-bottom: 0;
  }
}
</style>
