<template>
  <div class="f-timeline" :class="[sizeClass]">
    <FMTimelineStep
      v-for="(step, i) in steps"
      :key="i"
      v-bind="step"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    steps: object[];
    size: "s" | "m";
  }>(),
  {
    steps: () => [],
    size: "s",
  }
);

const sizeClass = computed(() => `is-${props.size}`);
</script>
