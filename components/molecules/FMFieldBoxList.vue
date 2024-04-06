<template>
  <div v-if="fields?.length" class="f-field-box-list" :class="[sizeClass]">
    <div v-if="label" class="f-field-box-list__heading">
      <FAFieldTitle :label="label" />
      <FALinkHelper v-if="helper" :text="helper" @click.prevent="emit('onHelperClick')" />
    </div>
    <div class="f-field-box-list__container">
      <FAFieldBox v-for="field in fields" :key="field" v-bind="field" :size="size" :selected="field.value == selected" :name="name" :required="required" @input="(value) => emitInput(value)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onHelperClick", "input"]);

const props = withDefaults(
  defineProps<{
    label?: string;
    helper?: string;
    name?: string;
    fields?: any[];
    selected?: string;
    size?: "m" | "s";
    required?: boolean;
  }>(),
  {
    size: "m",
  },
);

const emitInput = (value) => {
  emit("input", value);
};

const sizeClass = computed(() => `is-${props.size}`);
</script>

<style lang="scss">
.f-field-box-list {
  &__heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--f-length-2);
    margin-bottom: var(--f-length-1);
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--f-length-1);
  }
}
</style>
