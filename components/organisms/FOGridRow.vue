<template>
  <FMSectionContainer v-if="columns?.length" class="f-grid-row" :max-width="maxWidth" :margin-y="marginY" :margin-x="marginX" :padding-y="paddingY" :padding-x="paddingX">
    <div class="f-grid-row__content">
      <FMGridColumn v-for="(column, index) in columns" :key="index" v-bind="column" :align="align" />
      <slot />
    </div>
  </FMSectionContainer>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    columns: Array;
    marginY?: boolean;
    marginX?: boolean;
    paddingX?: boolean;
    paddingY?: boolean;
    maxWidth?: WrapperWidths;
    align?: "left" | "center" | "right";
  }>(),
  {
    marginY: true,
    marginX: false,
    paddingX: false,
    paddingY: false,
    maxWidth: "xl",
  },
);
</script>

<style lang="scss">
.f-grid-row {
  &__content {
    display: grid;
    row-gap: var(--grid-column-row-gap);
    column-gap: var(--grid-column-column-gap);
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @include media("<tablet") {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}
</style>
