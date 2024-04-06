<template>
  <section class="ft-page" v-bind="attr">
    <FMPageHeader :title="title" />
    <FMSectionContainer padding-x="true" max-width="l" :padding-y="true">
      <FARichtext :content="content" />
    </FMSectionContainer>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  content: String,
});
</script>

<style lang="scss"></style>
