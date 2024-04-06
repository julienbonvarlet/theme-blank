<template>
  <component :is="tag" :to="to" class="f-back">
    <FAIcon :icon="IconNames.Left" />
    <FAText>{{ text || $t("global.back") }}</FAText>
  </component>
</template>

<script lang="ts" setup>
import { IconNames } from "~/types/enums";

const props = defineProps<{
  to?: string | object;
  text?: string;
}>();

let NuxtLink;
try {
  NuxtLink = resolveComponent("NuxtLink");
} catch (error) {
  NuxtLink = "a";
}

const tag = computed(() => (props.to ? NuxtLink : "button"));
</script>

<style lang="scss">
.f-back {
  display: flex;
  align-items: center;
  gap: var(--f-length-1);
  width: fit-content;
  min-height: 35px; // Zone minimale cliquable pour accessibilité
  cursor: pointer;

  .f-icon {
    transition: transform ease-in-out 0.2s;
  }

  &:hover {
    .f-icon {
      transform: translateX(4px);
    }
  }
}
</style>
