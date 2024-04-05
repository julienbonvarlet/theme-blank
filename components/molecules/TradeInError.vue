<template>
  <FMSectionContainer class="f-ti-error" max-width="m" :padding-x="true">
    <FMFormMessage :text="$t('trade_in.error.text')" type="error" />
    <FAButton
      :label="$t('trade_in.error.button')"
      @click.prevent="emit('next')"
    />
  </FMSectionContainer>
</template>

<script setup lang="ts">
const emit = defineEmits(["next"]);
</script>

<style lang="scss">
.f-ti-error {
  .f-button {
    margin: var(--f-length-3) auto 0;
  }
}
</style>
