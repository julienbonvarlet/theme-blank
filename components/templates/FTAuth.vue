<template>
  <FOGridRow :columns="columns" max-with="xl" :padding-x="false" :margin-y="false" class="ft-auth">
    <FMSectionContainer :padding-x="true" :padding-y="true" max-wdith="xl" class-child="ft-auth__inner">
      <div class="ft-auth__header">
        <FATitle size="m">{{ title }}</FATitle>
        <FMFormMessage v-if="message" :text="message" />
        <FMFormMessage v-if="error" :text="error" type="error" />
      </div>

      <slot />
    </FMSectionContainer>
  </FOGridRow>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  message?: string;
  error?: string;
  image: string;
  alt?: string;
}>();

const columns = computed(() => [
  {
    type: "image",
    src: props.image,
    alt: props.alt || props.title,
  },
]);
</script>

<style lang="scss">
.ft-auth {
  text-align: center;
  --fk-max-width-input: var(--max-width-s);
  $self: &;

  &__header {
    margin-bottom: var(--f-length-5);

    .f-title {
      margin-bottom: var(--f-length-3);
    }
  }

  .f-form-message {
    margin: var(--f-length-2) auto;
    max-width: var(--fk-max-width-input);
    text-align: center;
  }

  .formkit-outer,
  .formkit-wrapper {
    text-align: left;
  }

  .formkit-wrapper,
  button.formkit-input {
    margin: 0 auto;
  }

  .f-link {
    margin: 0 auto;
  }

  @include media("<=tablet") {
    --grid-column-height: 30vh;

    &.f-section-container {
      &.is-margin-x,
      &.is-margin-y {
        margin: 0;
      }

      &.is-padding-x,
      &.is-padding-y {
        padding: 0;
      }
    }

    &__inner {
      max-width: 100%;
      padding: 0;
      margin: 0;
    }

    #{$self}__inner {
      padding: var(--f-length-4) var(--f-margin-page);
    }

    &__header .title {
      margin-bottom: var(--f-length-2);
    }

    &__header {
      margin-bottom: var(--f-length-2);
    }
  }
}
</style>
