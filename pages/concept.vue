<template>
  <div class="fp-concept">
    <FOBanner v-bind="data.banner" />
    <FOSectionText v-bind="data.sectionText" />
    <FOGridRow v-bind="data.gridColumns" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const data = {
  banner: {
    title: t("pages.concept.banner.title"),
    backgroundImage: "https://faume.imgix.net/10/home-baner.webp",
    align: "left",
  },
  sectionText: {
    title: t("pages.concept.section_text.title"),
    text: t("pages.concept.section_text.text"),
    link1: {
      title: t("pages.concept.section_text.button"),
      url: "/pages/sell",
      type: "primary",
    },
    align: "center",
  },
  gridColumns: {
    maxWidth: "xl",
    marginX: false,
    marginY: true,
    align: "center",
    columns: [
      {
        type: "text",
        title: t("pages.concept.section_row_1.title"),
        text: t("pages.concept.section_row_1.text"),
        link1: {
          title: t("pages.concept.section_row_1.button"),
          url: "/products",
          type: "primary",
        },
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/model-in-neutral-colors-by-window_1276x948_crop_center.jpg?v=1693927200",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/products/cb1758d1860f293155bc057894976fb6_44027e9b-b886-4f7e-8eff-5dfb611079ca_1648x1210_crop_center.jpg?v=1690992252",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "text",
        title: t("pages.concept.section_row_2.title"),
        text: t("pages.concept.section_row_2.text"),
        link1: {
          title: t("pages.concept.section_row_2.button"),
          url: "/pages/sell",
          type: "primary",
        },
      },
      {
        type: "text",
        title: t("pages.concept.section_row_3.title"),
        text: t("pages.concept.section_row_3.text"),
        link1: {
          title: t("pages.concept.section_row_3.button"),
          url: "/pages/sell",
          type: "primary",
        },
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/s-o-c-i-a-l-c-u-t-RzA6DUaiTl4-unsplash_1648x1210_crop_center.jpg?v=1687190628",
        alt: "Acheter Faume seconde main",
      },
    ],
  },
};
</script>
