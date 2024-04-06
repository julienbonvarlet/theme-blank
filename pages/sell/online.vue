<template>
  <div class="fp-sell-online">
    <FOBanner v-bind="bannerData" />
    <FOSectionIcons v-bind="sectionIconsData" />
    <FOGridRow v-bind="gridRowData" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const config = useRuntimeConfig();
const { $trackingPlan } = useNuxtApp();

const data = config.public.faume.sellOnlineConfig;
const bannerData = computed(() => {
  return {
    ...data.banner,
    title: t(data.banner.title),
    text: t(data.banner.text),
    link1: {
      ...data.banner.link1,
      title: t(data.banner.link1.title),
    },
  };
});
const sectionIconsData = computed(() => {
  return {
    ...data.sectionIcons,
    title: t(data.sectionIcons.title),
    icons: data.sectionIcons.icons.map((x) => ({ ...x, title: t(x.title) })),
  };
});
const gridRowData = computed(() => data.gridRow);

if (process.client) {
  $trackingPlan?.tradeinViewSellPage();
}
</script>
