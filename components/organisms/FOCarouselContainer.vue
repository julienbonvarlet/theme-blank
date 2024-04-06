<template>
  <FMSectionContainer v-if="carousels?.length" class="f-carousel-container" :padding-x="true" :margin-y="true" max-width="xl" class-child="f-carousel-container__inner">
    <div class="f-carousel-container__heading">
      <FMTextContainer :title="title" :title-size="titleSize" :subtitle="subtitle" :text="text" align="left" />
      <FATabs v-if="tabs.length > 1" :options="tabs" :active="activeTab" @change="changeTab(tab)" />
    </div>

    <div class="f-carousel-container__content">
      <FMCarousel :key="activeTab">
        <div v-for="collection in carousel.collections" :key="collection.label">
          <!-- <FMProductCard v-if="carouselType === 'product'" :product="item" /> -->
          <FMCollectionCard :collection="collection" />
        </div>
      </FMCarousel>
    </div>

    <FAButton v-if="link1" :size="ButtonSizes.M" :type="ButtonColors.PRIMARY" :to="link1.url" :label="link1.title" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
import { ButtonColors, ButtonSizes, TitleSizes } from "~/types/enums";
import type { Carousel } from "~/types/types";

const props = defineProps<{
  carousels: Carousel[];
  title?: string;
  subtitle?: string;
  text?: string;
  titleSize?: TitleSizes;
  link1?: Record<string, any>;
}>();

const activeTab = ref(props.carousels[0]);
const tabs = props.carousels.map((x: Carousel) => ({ label: x.title }));
const carousel = props.carousels.find((x) => x === activeTab.value) || props.carousels[0];

const changeTab = (x) => {
  console.log("LOLOL", x);
};
</script>

<style lang="scss">
.f-carousel-container {
  &__heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--f-length-2);
    margin-bottom: var(--f-length-3);

    @include media("<desktop") {
      flex-direction: column;
    }
  }

  &__content {
    position: relative;
  }

  .f-carousel {
    --gap: var(--f-carousel-container-gap);
    --items-visible: var(--f-carousel-container-items-visible);
  }

  &__inner {
    & > .f-button {
      margin: var(--f-length-3) auto 0;
    }
  }
}
</style>
