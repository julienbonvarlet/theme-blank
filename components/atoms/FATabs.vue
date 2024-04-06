<template>
  <div ref="tabs" class="f-tabs">
    <div v-for="option in options" :key="option" ref="optionRefs" class="f-tabs__option" :class="{ 'is-active': activeOption === option.value }" @click="setActive(option.value)">
      {{ $t(option.label) }}
    </div>
    <span class="f-tabs__indicator" :style="indicatorStyle" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any[];
  active: string;
}>();

const tabs = ref(null);
const optionRefs = ref([]);
const activeOption = ref(props.active || props.options?.[0]?.value);
const indicatorStyle = ref({});

const emit = defineEmits(["change"]);

const setActive = (option: string) => {
  activeOption.value = option;
  emit("change", option);
  updateIndicator();
};

watch(
  () => props.active,
  (newActive) => {
    activeOption.value = newActive;
  },
);

watch([() => props.active, () => props.options], () => {
  updateIndicator();
});

onMounted(() => {
  updateIndicator();
});

const updateIndicator = () => {
  nextTick(() => {
    const optionIndex = props.options.findIndex((option) => option.value === activeOption.value);
    const optionElement = optionRefs.value[optionIndex];
    if (optionElement) {
      indicatorStyle.value = {
        width: `${optionElement.offsetWidth}px`,
        transform: `translateX(${optionElement.offsetLeft}px)`,
      };
    }
  });
};
</script>

<style lang="scss">
.f-tabs {
  display: flex;
  border: var(--tabs-border);
  border-radius: var(--tabs-border-radius);
  font-size: var(--tabs-font-size);
  font-weight: var(--tabs-font-weight);
  overflow: hidden;
  width: fit-content;
  position: relative;
  background-color: var(--tabs-inactive-background);
  padding: 2px;
  font-family: var(--f-font-family-text);
  z-index: var(--z-index-default);

  &__indicator {
    position: absolute;
    bottom: 2px;
    left: 0;
    height: calc(100% - 4px);
    background-color: var(--tabs-active-background);
    transition: all ease 0.3s;
    z-index: var(--z-index-below);
    border-radius: var(--tabs-border-radius);
    pointer-events: none;
  }

  &__option {
    padding: var(--tabs-padding);
    cursor: pointer;
    color: var(--tabs-text-color-inactive);
    transition: color ease 0.3s;
    position: relative;
    z-index: var(--z-index-above);

    &.is-active {
      color: var(--tabs-text-color-active);
    }
  }
}
</style>
