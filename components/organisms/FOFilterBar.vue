<template>
  <FOFilterDropdown :filters-options="filtersOptions" :filters-options-active="filtersOptionsActive" :checkbox="checkbox" @filter-changed="handleFilterChange" />
</template>

<script setup lang="ts">
interface OrderOptions {
  filterTitle: string;
  displayText: boolean;
  filterIcon: string;
  displayIcon: boolean;
  filterListOptions: Array<any>;
  active: boolean;
}
defineProps<{
  filtersOptionsActive?: { type: string; value: string }[];
  filtersOptions?: {
    [key: string]: { active: boolean; items: { key: string; value: number }[] };
  };
  orderOptions?: { filters: OrderOptions[] };
}>();

const emit = defineEmits(["filter-changed"]);
const handleFilterChange = (newFilterValue: string) => {
  emit("filter-changed", newFilterValue);
};
</script>
