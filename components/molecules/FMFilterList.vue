<template>
  <div class="f-filter-list">
    <div v-for="(item, i) in items" :key="i" class="f-filter-list__checkbox">
      <FAFilterCheckbox :checkbox="checkbox" :type="type" :item="{ key: item.key, value: item.value }" :filters-options-active="filtersOptionsActive" @filter-changed="handleFilterChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checkbox?: boolean;
  filtersOptionsActive?: { type: string; value: string }[];
  type: string;
  items?: { active: boolean; items: { key: string; value: number }[] };
}>();

const emit = defineEmits(["filter-changed"]);
const handleFilterChange = (newFilterValue: string) => {
  emit("filter-changed", newFilterValue);
};
</script>

<style lang="scss">
.f-filter-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: var(--f-length-2);
  max-height: 300px;
  max-width: 310px;
  min-width: 180px;
  width: max-content;
  padding: var(--f-length-2) var(--f-length-4);
  background-color: var(--f-color-background-very-light);
  border: 1px solid var(--f-color-border);
  z-index: var(--z-index-modal);
  overflow-y: scroll;

  .f-filter-list__checkbox {
    cursor: pointer;
    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
