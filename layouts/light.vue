<template>
  <div class="fl-light">
    <FATopBar :text="$t('trade_in.top_bar')" icon="house" />
    <a href="/" class="fl-light__header">
      <FALogo />
    </a>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>
