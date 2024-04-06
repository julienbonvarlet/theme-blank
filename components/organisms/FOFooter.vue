<template>
  <footer class="f-footer">
    <FMSectionContainer :padding-x="true" max-width="l" :padding-y="true">
      <div class="f-footer__content">
        <div class="f-footer__nav">
          <FMNavigationList
            v-for="link in data.menu"
            :key="link"
            :title="link.title"
            :links="link.links"
          />
        </div>
        <FMSocialNetworkList
          class="f-footer__network-list"
          :items="data.socialNetworks"
        />
        <div class="f-footer__bottom">
          <FAText size="s">{{ $t("sections.footer.copyright") }}</FAText>
          <FAText weight="bold" size="s">
            <NuxtLink to="https://faume.co/">{{
              $t("sections.footer.faume")
            }}</NuxtLink>
          </FAText>
        </div>
      </div>
    </FMSectionContainer>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const config = useRuntimeConfig();

const data = computed(() => {
  return {
    menu: [
      {
        title: t("sections.footer.subtitle_1"),
        links: [
          { title: t("sections.footer.faq"), url: "/pages/faq" },
          { title: t("sections.footer.contact"), url: "/pages/contact" },
          {
            title: t("sections.footer.track_order"),
            url: "/pages/order-follow",
          },
        ],
      },
      {
        title: t("sections.footer.subtitle_2"),
        links: [
          {
            title: t("sections.footer.shipping_return"),
            url: "/pages/shipping-return",
          },
          { title: t("sections.footer.concept"), url: "/pages/concept" },
          { title: t("sections.footer.stores"), url: "/pages/sell" },
          // {title: 'Conditions générales de ventes', url: '/pages/cgv'},
          // {title: "Conditions générales d'utilisation", url: '/pages/cgu'},
        ],
      },
      {
        title: t("sections.footer.subtitle_3"),
        links: [
          { title: t("sections.footer.term_of_sell"), url: "/pages/cgv" },
          {
            title: t("sections.footer.term_of_use"),
            url: `${config.public.faume.clientUrlFirstHand}`,
            target: "_blank",
          },
        ],
      },
    ],
    socialNetworks: [
      {
        url: t("sections.footer.social_network.facebook"),
        icon: "facebook",
      },
      {
        url: t("sections.footer.social_network.youtube"),
        icon: "youtube",
      },
      {
        url: t("sections.footer.social_network.instagram"),
        icon: "instagram",
      },
      {
        url: t("sections.footer.social_network.pinterest"),
        icon: "pinterest",
      },
      {
        url: t("sections.footer.social_network.twitter"),
        icon: "twitter",
      },
    ],
  };
});
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
