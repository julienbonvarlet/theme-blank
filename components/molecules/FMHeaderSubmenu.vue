<template>
  <div class="f-header-submenu">
    <FMSectionContainer :padding-x="true" max-width="xl" class-child="f-header-submenu__inner">
      <nav v-if="colums" class="f-header-submenu__menu">
        <FMNavigationList v-for="link in colums" :key="link.label" :column="link" />
      </nav>
      <div v-if="visuals" class="f-header-submenu__visuals">
        <FMThumbnail v-for="link in visuals" :key="link.label" :visual="link" :title-size="TitleSizes.S" />
      </div>
    </FMSectionContainer>
  </div>
</template>

<script setup lang="ts">
import { TitleSizes } from "~/types/enums";
import type { MenuColumn, MenuVisual } from "~/types/types";

defineProps<{
  label: string;
  colums?: MenuColumn[];
  visuals?: MenuVisual[];
}>();
</script>

<style lang="scss">
.f-header-submenu {
  padding: var(--f-header-submenu-padding-y) 0;
  background-color: var(--f-header-submenu-background);
  color: var(--f-header-submenu-color);
  border-top: solid 1px var(--f-color-border);

  &__inner {
    display: flex;
    align-items: flex-start;
    gap: var(--f-header-submenu-gap);
    justify-content: space-between;
  }

  &__menu {
    display: flex;
    align-items: flex-start;
    gap: var(--f-header-submenu-gap);
  }

  &__visuals {
    display: flex;
    gap: var(--f-length-1);

    .f-thumbnail {
      max-width: 200px;
      width: auto;
      flex-grow: 1;
      --thumbnail-ratio: var(--f-collection-image-ratio);
    }
  }
}
</style>
