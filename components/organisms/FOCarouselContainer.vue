<template>
  <FMSectionContainer
    v-if="carousels?.length"
    class="f-carousel-container"
    :padding-x="true"
    :margin-y="true"
    max-width="xl"
    class-child="f-carousel-container__inner"
  >
    <div class="f-carousel-container__heading">
      <FMTextContainer :title="title" :title-size="titleSize" :subtitle="subtitle" :text="text" align="left" />
      <FATabs v-if="tabs?.length > 1" :options="tabs" :active="activeTab" @change="(x) => (activeTab = x)" />
    </div>

    <div class="f-carousel-container__content">
      <FMCarousel :key="activeTab">
        <div v-for="item in slides" :key="item">
          <FMProductCard v-if="carouselType === 'product'" :product="item" />
          <FMCollectionCard v-else :slug="item" />
        </div>
      </FMCarousel>
    </div>

    <FAButton v-if="link1" size="m" type="primary" :to="link1.url" :label="link1.title" />
  </FMSectionContainer>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  text?: string;
  carousels?: any[];
  titleSize?: TitleSizes;
  link1?: Record<string, any>;
}>();

const activeTab = ref(props.carousels?.[0]?.title);

const tabs = computed(() => props.carousels?.map((x) => ({ label: x.title, value: x.title })));
const carousel = computed(() => {
  if (!props.carousels?.length) {
    return null;
  }
  const foundCarousel = props.carousels?.find((x) => x.title === activeTab.value);
  return foundCarousel || props.carousels?.[0];
});
const button = computed(() => carousel.value?.button);
const slides = computed(() => carousel.value?.products || carousel.value?.collections);
const carouselType = computed(() => (carousel.value?.products ? "product" : "collection"));

watch(tabs, () => {
  activeTab.value = props.carousels?.[0]?.title;
});
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
