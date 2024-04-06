<template>
  <div class="f-grid-column">
    <FAImage v-if="type === 'image'" :src="src" :alt="alt" />
    <FMThumbnail v-else-if="type === 'thumbnail'" :title-size="titleSize || 'l'" :title="title" :src="src" :alt="alt" :to="to" />
    <div v-else-if="type === 'text'" class="f-grid-column__text">
      <img v-if="src" :src="src" :alt="alt || title" />
      <FMTextContainer :title-size="titleSize || 'm'" :title="title" :subtitle="subtitle" :text="text" :link1="link1" :link2="link2" :align="align" />
    </div>
    <FMIconInfoList v-else-if="type === 'icons'" :title-size="titleSize || 'm'" :title="title" :subtitle="subtitle" :text="text" :link="link1" :icons="icons" :align="align" />
  </div>
</template>

<script setup lang="ts">
import type { TitleSizes } from "~/types/enums";

const props = withDefaults(
  defineProps<{
    type: string;
    title?: string;
    subtitle?: string;
    text?: string;
    src?: string;
    alt?: string;
    icons?: Array;
    titleSize?: TitleSizes;
    to?: string | object;
    link1?: Record<string, any>;
    link2?: Record<string, any>;
    align?: "left" | "center" | "right";
  }>(),
  {
    type: "text",
  },
);
</script>

<style lang="scss">
.f-grid-column {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: var(--grid-column-height);

  & > .f-thumbnail,
  & > .f-img {
    width: 100%;
    height: 100%;
  }

  & > .f-img {
    position: absolute;
    top: 0;
    left: 0;
  }

  .f-text-container {
    padding: var(--f-margin-page);
    max-width: var(--max-width-m);
  }

  .f-thumbnail {
    img {
      height: 100%;
      aspect-ratio: auto;
    }
  }

  .f-icon-info-list__content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > * {
      margin: auto;
      max-width: 200px;
      width: 100%;
    }
  }

  &__text {
    position: relative;
    background-color: var(--f-color-background-very-light);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .f-text-container {
      position: relative;
      z-index: var(--z-index-above);
    }

    & > img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      top: 0;
      left: 0;
      z-index: var(--z-index-default);
      opacity: 0.7;
    }
  }
}
</style>
