<template>
  <div v-if="links?.length" class="f-navigation-list">
    <FATitle v-if="title" size="xs">{{ title.includes(".") ? $t(title) : title }}</FATitle>
    <FALink
      v-for="link in links"
      :key="link"
      size="s"
      :target="link.target"
      :text="link.title"
      :to="link.url || link.to"
      :is-active="false"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  links?: Array;
  title?: string;
}>();

const emit = defineEmits(["list-click"]);

function handleClick() {
  emit("list-click");
}
</script>

<style lang="scss">
.f-navigation-list {
  .f-title {
    margin-bottom: var(--navigation-list-title-margin-bottom);
  }
}
</style>
