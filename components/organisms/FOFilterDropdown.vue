<template>
  <div ref="clickArea" class="f-filter-dropdown">
    <div v-for="(filter, key) in filtersOptions" :key="key">
      <FMFilterLabel :text="key" icon="down" :display-text="true" :display-icon="true" :class="getFilterLabelClass(String(key))" @click.prevent="toggleOpen(String(key))" />
      <FMFilterList v-if="filter" :checkbox="checkbox" :type="key" :filters-options-active="filtersOptionsActive" :items="filter" @filter-changed="handleFilterChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checkbox?: boolean;
  filtersOptionsActive?: { type: string; value: string }[];
  filtersOptions?: {
    [key: string]: { active: boolean; items: { key: string; value: number }[] };
  };
}>();

const openedIndex = ref("");
const toggleOpen = (index: string) => {
  openedIndex.value = openedIndex.value === index ? "" : index;
};

const getFilterLabelClass = (index: string) => {
  if (openedIndex.value === index) {
    return "is-open";
  } else {
    return "";
  }
};

const clickArea = ref(null);
onClickOutside(clickArea, () => {
  openedIndex.value = "";
});

const emit = defineEmits(["filter-changed"]);
const handleFilterChange = (newFilterValue: string) => {
  emit("filter-changed", newFilterValue);
};
</script>

<style lang="scss">
.f-filter-dropdown {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  .f-filter-label {
    &.is-open {
      border-bottom-left-radius: 0px;

      .f-icon {
        transform: rotate(180deg);
      }
    }
  }

  div:first-of-type {
    .f-filter-label {
      border-top-left-radius: var(--f-filter-dropdown-border-radius);
      border-bottom-left-radius: var(--f-filter-dropdown-border-radius);

      &.is-open {
        border-bottom-left-radius: 0px;

        .f-icon {
          transform: rotate(180deg);
        }
      }
    }
  }

  div:last-of-type {
    .f-filter-label {
      border-top-right-radius: var(--f-filter-dropdown-border-radius);
      border-bottom-right-radius: var(--f-filter-dropdown-border-radius);

      &.is-open {
        border-bottom-right-radius: 0px;

        .f-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
