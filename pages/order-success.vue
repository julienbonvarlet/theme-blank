<template>
  <FOSectionText
    class="f-order-success"
    max-width="l"
    :title="$t('pages.checkout.confirmation.title')"
    :text="$t('pages.checkout.confirmation.text')"
    :link1="button"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const button = computed(() => ({
  title: t("pages.checkout.confirmation.button"),
  url: "/account",
}));
</script>

<style lang="scss">
.f-order-success {
  min-height: calc(
    100vh - var(--f-header-height) - var(--f-announcement-bar-height) - var(
        --f-top-bar-height
      )
  );
  padding: var(--f-margin-section) 0;
  &.is-margin-y {
    margin: 0;
  }
}
</style>
