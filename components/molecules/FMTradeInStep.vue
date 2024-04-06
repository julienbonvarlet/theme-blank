<template>
  <FMSectionContainer
    :max-width="maxWidth"
    class="f-ti-step"
    class-child="f-ti-step__inner"
    v-bind="attrs"
  >
    <div v-if="title || subtitle" class="f-ti-step__heading">
      <FATradeInTitle :title="title" tag="h1" size="m" />
      <FAText v-if="subtitle" :text="subtitle" />
      <slot name="heading" />
    </div>
    <slot />
  </FMSectionContainer>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    maxWidth?: string;
  }>(),
  {
    maxWidth: "m",
  },
);

const attrs = useAttrs();
</script>

<style lang="scss">
.f-ti-step {
  text-align: center;

  @include media("<tablet") {
    margin: var(--f-length-4) auto;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-4);

    @include media("<tablet") {
      gap: var(--f-length-3);
    }
  }

  .f-button {
    margin: 0 auto;

    & + .f-button {
      margin-top: var(--f-length-2);
    }
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: var(--f-length-2);
  }

  .formkit-wrapper {
    text-align: left;
    margin: auto;
  }
}
</style>
