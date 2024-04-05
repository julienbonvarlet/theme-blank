<template>
  <div @click="toggleActive()">
    <FACheckbox v-if="checkbox" :checked="isActive" />
    <FAText v-if="checkbox" :text="textLabel" />
    <FAFieldBox v-else :selected="isActive" :label="textLabel" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  checkbox?: boolean;
  type: string;
  item: { key: string; value: number };
  filtersOptionsActive?: { type: string; value: string }[];
}>();
const currentFilter: { type: string; value: string }[] =
  props.filtersOptionsActive || [];

const emit = defineEmits(["filter-changed"]);
const isActive = ref(false);

const textLabel = computed(() => {
  if (props.item.key.includes("-")) {
    return `${props.item.value}`;
  } else {
    return `${props.item.key} (${props.item.value})`;
  }
});

const toggleActive = () => {
  isActive.value = !isActive.value;

  if (isActive.value) {
    currentFilter.push({ type: props.type, value: props.item.key });
  } else {
    const index = currentFilter.findIndex(
      (item) => item.value === props.item.key,
    );
    if (index !== -1) {
      currentFilter.splice(index, 1);
    }
  }
  emit("filter-changed", currentFilter);
};
</script>

<style lang="scss">
.f-text {
  &.is-alone {
    border: 1px solid var(--f-color-border);
    border-radius: 50px;
    min-height: var(--f-length-5);
    min-width: var(--f-length-5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--f-length-1) var(--f-length-1);
  }
}

.f-checkbox {
  margin-right: var(--f-length-1);
}
</style>
