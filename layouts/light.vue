<template>
  <div class="fl-light">
    <FATopBar :text="$t('trade_in.top_bar')" :icon="IconNames.House" />
    <NuxtLink to="/" class="fl-light__header">
      <FALogo />
    </NuxtLink>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IconNames } from "~/types/enums";
</script>
