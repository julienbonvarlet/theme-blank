<template>
  <nuxt-icon v-if="icon?.length" class="f-icon" :name="icon" :filled="filled || !!icon.includes('sso')" />
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: IconNames;
  filled?: boolean;
}>();
</script>

<style lang="scss">
.f-icon {
  color: inherit; /* Hérite la couleur du parent */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
