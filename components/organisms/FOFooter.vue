<template>
  <footer class="f-footer">
    <FMSectionContainer :padding-x="true" max-width="l" :padding-y="true">
      <div class="f-footer__content">
        <div class="f-footer__nav">
          <FMNavigationList v-for="link in menu" :key="link.label" :column="link" />
        </div>
        <FMSocialNetworkList class="f-footer__network-list" :items="socialNetworks" />
        <div class="f-footer__bottom">
          <FAText size="s">{{ $t("sections.footer.copyright") }}</FAText>
          <FAText weight="bold" size="s">
            <NuxtLink to="https://faume.co/">{{ $t("sections.footer.faume") }}</NuxtLink>
          </FAText>
        </div>
      </div>
    </FMSectionContainer>
  </footer>
</template>

<script setup lang="ts">
import type { MenuColumn } from "~/types/types";

const { t } = useI18n();
const config = useRuntimeConfig();

const menu: MenuColumn[] = [
  {
    label: "sections.footer.subtitle_1",
    items: [
      { label: "sections.footer.faq", to: "/faq" },
      { label: "sections.footer.contact", to: "/contact" },
      { label: "sections.footer.track_order", to: "/order-follow" },
    ],
  },
  {
    label: "sections.footer.subtitle_2",
    items: [
      { label: "sections.footer.shipping_return", to: "/shipping-return" },
      { label: "sections.footer.concept", to: "/concept" },
      { label: "sections.footer.stores", to: "/sell" },
    ],
  },
  {
    label: "sections.footer.subtitle_3",
    items: [
      { label: "sections.footer.term_of_sell", to: "/cgv" },
      { label: "sections.footer.term_of_use", to: `${config.clientUrlFirstHand}` },
    ],
  },
];

const socialNetworks = [
  {
    url: "sections.footer.social_network.facebook",
    icon: "facebook",
  },
  {
    url: "sections.footer.social_network.youtube",
    icon: "youtube",
  },
  {
    url: "sections.footer.social_network.instagram",
    icon: "instagram",
  },
  {
    url: "sections.footer.social_network.pinterest",
    icon: "pinterest",
  },
  {
    url: "sections.footer.social_network.twitter",
    icon: "twitter",
  },
];
</script>

<style lang="scss">
.f-footer {
  background-color: var(--footer-background);
  color: var(--footer-color);

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--footer-gap);
    align-items: center;
    justify-content: center;

    & > * {
      width: 100%;
    }
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    max-width: var(--max-width-m);
  }

  &__network-list {
    padding: var(--f-length-2) 0;
    border-top: solid 1px var(--f-color-border);
    border-bottom: solid 1px var(--f-color-border);
  }

  &__bottom {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-direction: column;
  }
}
</style>
