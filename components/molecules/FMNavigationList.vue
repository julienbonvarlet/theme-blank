<template>
  <div class="f-navigation-list">
    <FATitle :size="TitleSizes.XS">{{ $t(column.label) }}</FATitle>
    <FALink v-for="link in column.items" :key="link.label" size="s" :to="link.to" :is-active="false">{{ $t(link.label) }}</FALink>
  </div>
</template>

<script setup lang="ts">
import { TitleSizes } from "~/types/enums";
import type { MenuColumn } from "~/types/types";
import FALink from "../atoms/FALink.vue";

const props = defineProps<{
  column: MenuColumn;
}>();
</script>

<style lang="scss">
.f-navigation-list {
  .f-title {
    margin-bottom: var(--navigation-list-title-margin-bottom);
  }
}
</style>
