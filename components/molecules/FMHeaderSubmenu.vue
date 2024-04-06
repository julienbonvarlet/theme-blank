<template>
  <div class="f-header-submenu">
    <FMSectionContainer
      :padding-x="true"
      max-width="xl"
      class-child="f-header-submenu__inner"
    >
      <nav v-if="navigationListData" class="f-header-submenu__menu">
        <FMNavigationList
          v-for="link in navigationListData"
          :key="link"
          v-bind="link"
        />
      </nav>
      <div v-if="visualsData" class="f-header-submenu__visuals">
        <FMThumbnail
          v-for="visual in visualsData"
          :key="visual"
          v-bind="visual"
          title-size="s"
        />
      </div>
    </FMSectionContainer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { getLinkTitle } = useMenuStore();

const props = defineProps<{
  menu?: Array;
  visuals?: Array;
}>();

const navigationListData = computed(() =>
  !props.menu?.length
    ? null
    : [...props.menu].map((link) => ({
        title: t(link.title),
        links: [...link.links].map((x) => ({
          title: getLinkTitle(x),
          to: x.to,
        })),
      })),
);

const visualsData = computed(() =>
  !props.visuals?.length
    ? null
    : [...props.visuals].map((visual) => ({
        title: t(`menu.${visual.slug.replaceAll("-", "_")}`),
        src: visual.image,
        to: { name: visual.slug },
      })),
);
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
