<template>
  <FMSectionContainer class="f-announcement-bar" class-child="f-announcement-bar__inner" :padding-x="true">
    <FAIcon :icon="faumeConfig.header.announcementBar.icon" />
    <FAText :text="$t('sections.announcement_bar')" :size="TextSizes.S" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { TextSizes } from "~/types/enums";

import faumeConfig from "~/faumeConfig";
</script>

<style lang="scss">
.f-announcement-bar {
  min-height: var(--f-announcement-bar-height);
  color: var(--f-announcement-bar-color);
  background-color: var(--f-announcement-bar-background);
  width: 100%;
  text-align: center;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--f-length-1);
  }

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
