<template>
  <FOSectionIcons class="f-section-reassurance" :padding-y="true" :margin-y="false" :icons="icons" />
</template>

<script setup lang="ts">
interface Icon {
  title?: string;
  text?: string;
  alt?: string;
  image?: string;
  icon?: string;
}

defineProps<{
  icons: Icon[];
}>();
</script>
