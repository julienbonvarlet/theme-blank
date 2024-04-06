<template>
  <div class="f-carousel">
    <div ref="carousel" class="f-carousel__inner">
      <slot />
    </div>

    <div class="f-carousel__arrows">
      <FAButtonIcon
        class="f-carousel__arrows--prev"
        :is-disabled="isFirstItemVisible"
        icon="left"
        @click="scrollPrev"
      />

      <FAButtonIcon
        class="f-carousel__arrows--next"
        :is-disabled="isLastItemVisible"
        icon="right"
        @click="scrollNext"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const carousel = ref(null);
const isFirstItemVisible = ref(true);
const isLastItemVisible = ref(false);

const handleScroll = () => {
  updateButtonStates();
};

const scrollPrev = () => {
  if (carousel.value) {
    carousel.value.scrollLeft -= carousel.value.clientWidth;
  }
};

const scrollNext = () => {
  if (carousel.value) {
    carousel.value.scrollLeft += carousel.value.clientWidth;
  }
};

onMounted(() => {
  updateButtonStates();
  if (carousel.value) {
    carousel.value.addEventListener("scroll", handleScroll);
  }
});

const updateButtonStates = () => {
  nextTick(() => {
    if (carousel.value) {
      isFirstItemVisible.value = carousel.value.scrollLeft === 0;
      const { scrollLeft, scrollWidth, clientWidth } = carousel.value;
      isLastItemVisible.value = scrollLeft + clientWidth >= scrollWidth;
    }
  });
};
</script>

<style lang="scss">
.f-carousel {
  position: relative;
  --gap: var(--f-length-1);
  --items-visible: 4;

  &__inner {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: var(--gap);
    scrollbar-width: none;
    -ms-overflow-style: none;
    z-index: var(--z-index-default);

    &::-webkit-scrollbar {
      display: none;
    }

    & > * {
      flex: none;
      width: calc((100% / var(--items-visible)) - (var(--gap) * (var(--items-visible) - 1) / var(--items-visible)));
    }
  }

  &__arrows {
    &--prev,
    &--next {
      position: absolute;
      top: 50%;
      z-index: var(--z-index-above);

      &.is-disabled {
        opacity: 0;
      }
    }

    &--prev {
      left: 0;
      transform: translate(-50%, -50%);
    }

    &--next {
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
