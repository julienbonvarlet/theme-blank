<template>
  <div
    class="f-collapse"
    :class="{ 'is-title': isTitle, 'not-ready': !maxContentHeight }"
  >
    <div class="f-collapse__heading" @click.prevent="toggleCollapse">
      <FAText v-if="!isTitle" :tag="titleTag" :size="textSize">{{
        title
      }}</FAText>
      <FATitle v-else :size="titleSize" :tag="titleTag">{{ title }}</FATitle>
      <FAIcon :key="isOpen" :icon="isOpen ? 'up' : 'down'" />
    </div>
    <div
      class="f-collapse__content"
      :style="{ maxHeight: isOpen ? maxContentHeight + 'px' : '0' }"
    >
      <div ref="textContent" class="f-collapse__text">
        <slot>
          <FARichtext :content="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string;
    content?: string;
    isTitle?: boolean;
    titleSize?: (typeof TitleSizes)[string];
    textSize?: (typeof TextSizes)[string];
    titleTag?: (typeof TitleTags)[string];
    open: boolean;
  }>(),
  {
    titleSize: "s",
    titleTag: "p",
    isTitle: false,
  },
);

const isOpen = ref(props.open || false);
const maxContentHeight = ref(0);
const textContent = ref(null);

const toggleCollapse = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    maxContentHeight.value = calculateMaxHeight();
  }
};

const calculateMaxHeight = () => {
  return textContent.value?.offsetHeight || 0;
};

const handleResize = () => {
  if (isOpen.value) {
    maxContentHeight.value = calculateMaxHeight();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  maxContentHeight.value = calculateMaxHeight();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss">
.f-collapse {
  --padding: var(--f-length-2);
  text-align: left;
  $self: &;
  transition: opacity ease 1s;

  &.is-title {
    --padding: var(--f-length-3);
  }

  &.not-ready {
    opacity: 0;
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    gap: var(--f-length-2);
    align-items: center;
    padding: var(--padding) 0;
    cursor: pointer;
    border-bottom: solid 1px var(--f-color-border);
  }

  &__content {
    overflow: hidden;
    transition: max-height ease 0.3s;
  }

  &__text {
    padding: var(--padding) 0;
    display: block;
  }

  &:not(.is-title) {
    #{$self}__text {
      font-size: var(--f-text-s-font-size);
    }
  }
}
</style>
