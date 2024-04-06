<template>
  <component :is="tag" :to="to" class="f-icon-info">
    <FAIcon v-if="icon" :icon="icon" />
    <FAImage v-if="image" class="f-icon-info__img" :alt="alt || title || text || 'icon'" :src="image" />
    <FATitle v-if="title" size="xs">{{ title }}</FATitle>
    <FARichtext v-if="text?.length" :content="text" />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  text?: string;
  alt?: string;
  image?: string;
  icon?: IconNames;
  to?: string | object;
}>();

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const tag = computed(() => (props.to ? "NuxtLink" : "div"));
</script>

<style lang="scss">
.f-icon-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--icon-info-gap);
  text-align: center;

  &__img {
    width: auto;
    height: var(--icon-info-image);
    display: block;
    margin: 0 auto;
    object-fit: contain;
    margin-bottom: 5px;
  }

  .f-icon {
    font-size: var(--f-length-2);
  }
}
</style>
