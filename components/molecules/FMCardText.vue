<template>
  <div class="f-card-text">
    <FACardTitle v-if="title" :title="title" :tag="titleTag" />
    <FAText v-if="text" :text="text" size="s" />
    <FMPriceContainer :price="price" :original-price="originalPrice" size="s" />
    <FAText v-if="description" :text="description" size="xs" />
    <FAText v-if="details" :text="details" size="xs" :is-grey="true" weight="light" />
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    titleTag?: string;
    text?: string;
    description?: string;
    details?: string;
    price?: number;
    originalPrice?: number;
    displayOldPrice?: boolean;
  }>(),
  {
    displayOldPrice: true,
    titleTag: "h3",
  },
);
</script>

<style lang="scss">
.f-card-text {
  display: flex;
  flex-direction: column;
  gap: var(--f-card-text-gap);
}
</style>
