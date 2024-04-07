<template>
  <div class="f-progress-bar">
    <span class="f-progress-bar__cursor" :style="{ width: `${percent}%` }"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  percent: number;
}>();
</script>

<style lang="scss">
.f-progress-bar {
  height: var(--f-progress-bar-height);
  border: solid 1px var(--f-progress-bar-color-primary);
  background-color: var(--f-progress-bar-color-secondary);
  overflow: hidden;
  border-radius: var(--f-progress-bar-border-radius);
  width: 100%;

  &__cursor {
    display: block;
    height: 100%;
    background-color: var(--f-progress-bar-color-primary);
    transition: width ease 0.2s;
  }
}
</style>
