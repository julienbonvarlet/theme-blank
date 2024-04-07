<template>
  <FMSectionContainer class="f-page-header" :padding-y="true" :padding-x="true">
    <FATitle tag="h2" size="l">{{ title }}</FATitle>
    <FSubtitle v-if="subtitle" :text="subtitle" :tag="'h3'"></FSubtitle>
  </FMSectionContainer>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: string,
    required: true,
  },
  subtitle: {
    type: string,
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
