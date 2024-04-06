<template>
  <div class="f-banner" :class="maxHeightClass">
    <img class="f-banner__image" :src="backgroundImage" alt="Faume" />
    <FMSectionContainer
      :padding-x="true"
      :padding-y="true"
      max-width="xl"
      class-child="f-banner__content"
    >
      <FMTextContainer
        :title="title"
        :title-size="titleSize"
        :title-tag="titleTag"
        :subtitle="subtitle"
        :text="text"
        :link1="link1"
        :link2="link2"
        :align="props.align"
      />
    </FMSectionContainer>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    titleSize?: (typeof TitleSizes)[string];
    titleTag?: (typeof TitleTags)[string];
    text?: string;
    subtitle?: string;
    backgroundImage?: String;
    link1?: Record<string, any>;
    link2?: Record<string, any>;
    size?: typeof BannerSizes;
    align?: "left" | "center" | "right";
  }>(),
  {
    titleSize: "xl",
    titleTag: "h1",
    size: "l",
  },
);

const maxHeightClass = computed(() => (props.size ? `is-${props.size}` : null));
</script>

<style lang="scss">
.f-banner {
  @include content-grid(full);
  position: relative;
  text-align: center;
  color: var(--f-color-text-light);
  background-color: var(--f-color-background-dark);
  background-size: cover;
  background-position: center;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-s {
    min-height: 30vh;
  }

  &.is-m {
    min-height: 50vh;
  }

  &__content {
    z-index: var(--z-index-above);
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: var(--f-length-3);
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-default);
    object-fit: cover;
    opacity: 0.8;
  }

  &:has(.f-text-container.is-left) {
    justify-content: flex-start;
  }
}
</style>
