<template>
  <div class="fp-sell">
    <FOSectionText v-bind="data.sectionText" />
    <FOGridRow v-bind="data.gridRow" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const data = {
  sectionText: {
    title: t("pages.sell_choice.title"),
    titleTag: "h1",
    titleSize: "l",
    align: "center",
  },
  gridRow: {
    maxWidth: "xl",
    marginX: true,
    marginY: true,
    columns: [
      {
        type: "thumbnail",
        src: "https://demo.faume.co/cdn/shop/files/model-in-neutral-colors-by-window_1276x948_crop_center.jpg?v=1693927200",
        alt: t("pages.sell_choice.online"),
        title: t("pages.sell_choice.online"),
        to: "/pages/sell/online",
        titleSize: "m",
      },
      {
        type: "thumbnail",
        src: "https://demo.faume.co/cdn/shop/files/man-in-white-and-light-tan-outfit_1276x948_crop_center.jpg?v=1693927324",
        alt: t("pages.sell_choice.store"),
        title: t("pages.sell_choice.store"),
        to: "/pages/sell/store",
        titleSize: "m",
      },
    ],
  },
};
</script>

<style lang="scss">
.fp-sell {
  --grid-column-row-gap: 15px;
  --grid-column-column-gap: 15px;
}
</style>
