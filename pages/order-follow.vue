<template>
  <FMSectionContainer :padding-x="true" max-width="m" :padding-y="true">
    <FMTextContainer
      :title="$t('pages.order_tracking.title')"
      title-size="m"
      title-tag="h1"
      :text="$t('pages.order_tracking.text')"
    >
      <FMFormOrderFollow />
    </FMTextContainer>
  </FMSectionContainer>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
