<template>
  <div class="f-icon-info-list">
    <FMTextContainer
      :title="title"
      :title-size="titleSize"
      :text="text"
      :subtitle="subtitle"
      :link1="link"
      :align="align"
    >
      <div class="f-icon-info-list__content">
        <FMIconInfo
          v-for="item in icons"
          :key="item"
          :title="item.title"
          :text="item.text"
          :image="item.image"
          :alt="item.alt"
        />
      </div>
    </FMTextContainer>
  </div>
</template>

<script setup lang="ts">
import { TitleSizes } from "../../constants/ui-config";

const props = withDefaults(
  defineProps<{
    title?: string;
    titleSize?: (typeof TitleSizes)[string];
    subtitle?: string;
    text?: string;
    link?: Record<string, any>;
    icons?: Array;
    align?: "left" | "center" | "right";
  }>(),
  {
    titleSize: "m",
  },
);
</script>

<style lang="scss">
.f-icon-info-list {
  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    row-gap: 15px;
    align-items: flex-start;
    justify-content: space-evenly;
    text-align: center;

    & > * {
      flex-grow: 1;
      width: 200px;
      max-width: calc(50% - 5px);
    }
  }
}
</style>
