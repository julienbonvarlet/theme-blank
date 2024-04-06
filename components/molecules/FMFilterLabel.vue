<template>
  <div class="f-filter-label">
    <FAText v-if="displayText">{{ filterLabeltext }}</FAText>
    <FAIcon v-if="displayIcon" :icon="icon" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  text?: string;
  icon?: string;
  displayText?: boolean;
  displayIcon?: boolean;
}>();

const filterlabelCorrespondance: Record<string, string> = {
  state: t("pages.collection.filters.labels.state"),
  size_filters: t("pages.collection.filters.labels.size"),
  color_filters: t("pages.collection.filters.labels.color"),
  composition: t("pages.collection.filters.labels.composition"),
  gender: t("pages.collection.filters.labels.gender"),
  modele: t("pages.collection.filters.labels.type"),
  season: t("pages.collection.filters.labels.season"),
  sort: t("pages.collection.filters.labels.sort"),
};
const filterLabeltext = computed(() =>
  props.text ? filterlabelCorrespondance[props.text] : ""
);
</script>

<style lang="scss">
.f-filter-label {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  border: 1px solid var(--f-color-border);
  padding: var(--f-length-1) var(--f-length-2);
  cursor: pointer;

  &:not(.is-open) + .f-filter-list {
    opacity: 0;
    pointer-events: none;
  }

  p {
    margin-right: var(--f-length-1);
  }
}
</style>
