<template>
  <div v-if="price || price === 0" class="f-price-container" :class="[sizeClass]">
    <FAPrice :price="price" :size="size" />
    <FAPrice v-if="displayOldPrice && originalPrice > price" :price="originalPrice" :size="size" :old="true" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    price?: string | number;
    originalPrice?: string | number;
    size?: PriceSizes;
    displayOldPrice?: boolean;
  }>(),
  {
    size: "s",
    displayOldPrice: true,
  },
);

const sizeClass = computed(() => `price--${props.size}`);
</script>

<style lang="scss">
.f-price-container {
  display: flex;
  align-items: center;
  width: fit-content;
  gap: var(--f-length-1);
}
</style>
