<template>
  <div class="fl-default">
    <FATopBar />
    <!-- <FOHeader />
    <FAAnnouncementBar v-if="showAnnouncementBar" /> -->
    <slot />
    <!-- <FOSectionReassurance v-bind="data.sectionReassurance" />
    <FOFooter /> -->
  </div>
</template>

<script setup lang="ts">
import faumeConfig from "~/faumeConfig";

const { t } = useI18n();

const showAnnouncementBar = faumeConfig.header.showAnnouncementBar;

const data = {
  sectionReassurance: {
    icons: [
      {
        text: t("trade_in.reinsurance.1"),
        alt: t("trade_in.reinsurance.1"),
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
      },
      {
        text: t("trade_in.reinsurance.2"),
        alt: t("trade_in.reinsurance.2"),
        image:
          "https://demo.faume.co/cdn/shop/files/keyboard_double_arrow_left_FILL0_wght400_GRAD0_opsz24.svg?v=1699347817",
      },
      {
        text: t("trade_in.reinsurance.3"),
        alt: t("trade_in.reinsurance.3"),
        image: "https://demo.faume.co/cdn/shop/files/clean-clothes_100x100_crop_center.png?v=1691013900",
      },
      {
        text: t("trade_in.reinsurance.4"),
        alt: t("trade_in.reinsurance.4"),
        image: "https://demo.faume.co/cdn/shop/files/verified_user_FILL0_wght400_GRAD0_opsz24.svg?v=1699347206",
      },
    ],
  },
};
</script>
