<template>
  <div class="fp-buy">
    <FOSectionText
      :title="$t('pages.buy.title')"
      :subtitle="$t('pages.buy.subtitle')"
      :text="$t('pages.buy.text')"
    />
    <FOCollectionOverview :blocks="blocks" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const blocks = computed(() => {
  return [
    {
      image: "https://faume.imgix.net/18/home-baner.webp",
      title: {
        text: t("pages.buy.blocks.1.title"),
        link: "/",
      },
      links: [
        {
          text: t("pages.buy.blocks.1.link_1"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.1.link_2"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.1.link_3"),
          to: "/",
        },
      ],
    },
    {
      image: "https://faume.imgix.net/18/home-baner.webp",
      title: {
        text: t("pages.buy.blocks.2.title"),
        link: "/",
      },
      links: [
        {
          text: t("pages.buy.blocks.2.link_1"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.2.link_2"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.2.link_3"),
          to: "/",
        },
      ],
    },
    {
      image: "https://faume.imgix.net/18/home-baner.webp",
      title: {
        text: t("pages.buy.blocks.3.title"),
        link: "/",
      },
      links: [
        {
          text: t("pages.buy.blocks.3.link_1"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.3.link_2"),
          to: "/",
        },
        {
          text: t("pages.buy.blocks.3.link_3"),
          to: "/",
        },
      ],
    },
  ];
});
</script>
