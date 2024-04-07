<template>
  <div class="fp-index">
    <FOBanner
      :title="$t('pages.index.banner.title')"
      align="center"
      :subtitle="$t('pages.index.banner.subtitle')"
      :background-image="backgroundImageUrl"
      :link1="{
        title: $t('pages.index.banner.button1'),
        url: '/collections/tous-les-produits',
        type: 'secondary',
      }"
      :link2="{
        title: $t('pages.index.banner.button2'),
        url: '/sell',
        type: 'secondary',
      }"
    />

    <FOSectionText
      :title="$t('pages.index.section_text.title')"
      :text="$t('pages.index.section_text.text')"
      :link1="{
        label: $t('pages.index.section_text.button'),
        to: '/concept',
        type: 'primary',
      }"
      align="center"
    />

    <FOCarouselContainer :title="$t('pages.index.carousel_sizes.title')" :carousels="sizeCarousels" />

    <!-- <FOProductsCarousel
      :title="$t('pages.index.carousel_products.title')"
      :link1="{
        title: $t('pages.index.carousel_products.button'),
        url: '/collections/tous-les-produits',
        type: 'secondary',
      }"
    /> -->

    <!-- <FOGridRow :columns="gridColumns" align="center" /> -->

    <!-- <FOCarouselContainer :title="$t('pages.index.carousel_collections.title')" :carousels="typeCarousels" /> -->
    <FONewsletter />
  </div>
</template>

<script setup lang="ts">
import { menSizeCollections, menTypeCollections, womenSizeCollections, womenTypeCollections } from "~/configs/menu";
import faumeConfig from "~/faumeConfig";
import type { Carousel } from "~/types/types";

const { t } = useI18n();

const menuConfig = faumeConfig.menu;

const backgroundImageUrl =
  "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Library-Sites-TKooplesSharedLibrary/default/dwf69f6d23/2024/SS24/Post%20Christmas/Homepage/desk/231221_FW23_POST_XMAS_HP_HEADER_DESK.jpg";

const sizeCarousels: Carousel[] = [
  {
    title: menuConfig[0].label,
    collections: womenSizeCollections,
  },
  {
    title: menuConfig[1].label,
    collections: menSizeCollections,
  },
];

const typeCarousels: Carousel[] = [
  {
    title: menuConfig[0].label,
    collections: womenTypeCollections,
  },
  {
    title: menuConfig[1].label,
    collections: menTypeCollections,
  },
];

const gridColumns = [
  {
    type: "thumbnail",
    src: "https://demo.faume.co/cdn/shop/files/model-in-neutral-colors-by-window_1276x948_crop_center.jpg?v=1693927200",
    alt: t("pages.index.grid.1.title"),
    title: t("pages.index.grid.1.title"),
    to: "/products",
    titleSize: "xl",
  },
  {
    type: "icons",
    title: t("pages.index.grid.2.title"),
    link1: {
      title: t("pages.index.grid.2.button"),
      url: "/sell",
      type: "primary",
    },
    icons: [
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.2.icons.1"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.2.icons.2"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.2.icons.3"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.2.icons.4"),
      },
    ],
  },
  {
    type: "icons",
    title: t("pages.index.grid.3.title"),
    link1: {
      title: t("pages.index.grid.3.button"),
      url: "/collections/selected",
      type: "primary",
    },
    icons: [
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.3.icons.1"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.3.icons.2"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.3.icons.3"),
      },
      {
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
        text: t("pages.index.grid.3.icons.4"),
      },
    ],
  },
  {
    type: "thumbnail",
    src: "https://demo.faume.co/cdn/shop/files/man-in-white-and-light-tan-outfit_1276x948_crop_center.jpg?v=1693927324",
    alt: t("pages.index.grid.4.title"),
    title: t("pages.index.grid.4.title"),
    to: "/sell",
    titleSize: "xl",
  },
];
</script>
