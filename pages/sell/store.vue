<template>
  <div class="fp-sell-in-store">
    <FOBanner v-bind="data.banner" />
    <FOSectionIcons v-bind="data.sectionIcons" />
    <FOGridRow v-bind="data.gridRow" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const data = {
  banner: {
    title: t("pages.sell_in_store.banner.title"),
    subtitle: t("pages.sell_in_store.banner.subtitle"),
    text: t("pages.sell_in_store.banner.text"),
    backgroundImage: "https://faume.imgix.net/10/home-baner.webp",
    link1: {
      title: t("pages.sell_in_store.banner.button"),
      url: "/pages/sell/store-locator",
      type: "secondary",
    },
    align: "left",
  },
  sectionIcons: {
    title: t("pages.sell_in_store.section_icons.title"),
    align: "center",
    icons: [
      {
        title: t("pages.sell_in_store.section_icons.steps.1.title"),
        text: t("pages.sell_in_store.section_icons.steps.1.text"),
        image:
          "https://demo.faume.co/cdn/shop/files/clean-clothes_594x140.png?v=1691013900",
      },
      {
        title: t("pages.sell_in_store.section_icons.steps.2.title"),
        text: t("pages.sell_in_store.section_icons.steps.2.text"),
        image:
          "https://demo.faume.co/cdn/shop/files/contact-form_594x140.png?v=1691012775",
      },
      {
        title: t("pages.sell_in_store.section_icons.steps.3.title"),
        text: t("pages.sell_in_store.section_icons.steps.3.text"),
        image:
          "https://demo.faume.co/cdn/shop/files/delivery-truck_594x140.png?v=1691012825",
      },
      {
        title: t("pages.sell_in_store.section_icons.steps.4.title"),
        text: t("pages.sell_in_store.section_icons.steps.4.text"),
        image:
          "https://demo.faume.co/cdn/shop/files/voucher_594x140.png?v=1691012875",
      },
    ],
    link: {
      title: t("pages.sell_in_store.section_icons.button"),
      url: "/pages/sell",
    },
  },
  gridRow: {
    maxWidth: "xl",
    marginX: true,
    marginY: true,
    align: "center",
    columns: [
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/23Q2-BAGGYJEANS-STORIES-07-IMAGES-PORTRAIT-B-Desktop.webp?v=1696668310",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "text",
        title: t("pages.sell_in_store.section_advantages.title"),
        text: t("pages.sell_in_store.section_advantages.text"),
        link1: {
          title: t("pages.sell_in_store.section_advantages.button"),
          url: "/pages/sell",
          type: "primary",
        },
      },
      {
        type: "text",
        title: t("pages.sell_in_store.section_how_it_works.title"),
        text: t("pages.sell_in_store.section_how_it_works.text"),
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/files/lena-kudryavtseva-itUsEU7GgDU-unsplash_1648x1210_crop_center.jpg?v=1687190627",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "image",
        src: "https://demo.faume.co/cdn/shop/products/51d12af929b2528381723830943dea9b_1648x1210_crop_center.jpg?v=1690992345",
        alt: "Acheter Faume seconde main",
      },
      {
        type: "text",
        title: t("pages.sell_in_store.section_conditions.title"),
        text: t("pages.sell_in_store.section_conditions.text"),
        link1: {
          title: t("pages.sell_in_store.section_conditions.button"),
          url: "/pages/sell",
          type: "primary",
        },
      },
    ],
  },
};
</script>
