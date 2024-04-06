<template>
  <nuxt-icon class="f-icon" :name="icon" :filled="filled" />
</template>

<script setup lang="ts">
import type { IconNames } from "~/types/enums";

defineProps<{
  icon: IconNames;
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
