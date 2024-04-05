<template>
  <FMSectionContainer
    class="f-announcement-bar"
    class-child="f-announcement-bar__inner"
    :padding-x="true"
  >
    <FAIcon :icon="headerData.announcementBar.icon" />
    <FAText :text="$t(headerData.announcementBar.text)" size="s" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
import headerConfig from "../../configs/headerConfig";
const headerData = headerConfig;
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
