<template>
  <div class="f-seller-logged">
    <FAButtonIcon icon="user" />
    <div class="f-seller-logged__info">
      <FACardTitle :title="name" />
      <FAText size="s" :text="store" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  store: string;
}>();
</script>

<style lang="scss">
.f-seller-logged {
  display: flex;
  align-items: center;
  gap: var(--f-length-1);

  .f-button-icon {
    pointer-events: none;
  }
}
</style>
