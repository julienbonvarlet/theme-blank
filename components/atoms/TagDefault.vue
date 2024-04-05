<template>
  <div class="f-tag-default" :class="[colorClass]">
    <FAIcon :icon="icon" />
    <FAText size="xs">
      <slot>{{ text }}</slot>
    </FAText>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string;
    icon?: string;
  }>(),
  {
    icon: "star",
  },
);

const colorClass = computed(() => {
  return {};
});
</script>

<style lang="scss">
.f-tag-default {
  padding: var(--f-length-1);
  text-align: center;
  display: flex;
  gap: var(--f-length-1);
  width: fit-content;
  justify-content: center;
  background-color: var(--f-color-background-very-light);
  align-items: center;

  .f-text {
    line-height: 1;
  }
}
</style>
