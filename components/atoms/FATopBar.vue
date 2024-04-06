<template>
  <FMSectionContainer class="f-top-bar" class-child="f-top-bar__inner" :padding-x="true">
    <FAIcon v-if="icon" :icon="icon" />
    <FAText :text="topBarText" :size="size" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { IconNames, TextSizes } from "~/types/enums";

const { t } = useI18n();
const topBarText = t("sections.top_bar");
const size = TextSizes.XS;
defineProps<{
  icon?: IconNames;
}>();
</script>

<style lang="scss">
.f-top-bar {
  min-height: var(--f-top-bar-height);
  color: var(--f-top-bar-color);
  background-color: var(--f-top-bar-background);
  text-transform: uppercase;
  width: 100%;
  text-align: center;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--f-length-2);
  }

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
