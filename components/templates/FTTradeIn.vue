<template>
  <FMSectionContainer max-width="xl" :padding-x="true" class="ft-trade-in" class-child="ft-trade-in__inner">
    <FMStepsMenu :steps="menu" />
    <slot />
  </FMSectionContainer>
  <FOSectionReassurance class="f-ti-reassurance" v-bind="data.sectionReassurance" />
</template>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const wording = {
  customer: {
    menu: {
      1: t("trade_in.menu.customer.1"),
      2: t("trade_in.menu.customer.2"),
      3: t("trade_in.menu.customer.3"),
      4: t("trade_in.menu.customer.4"),
    },
  },
  store: {
    menu: {
      1: t("trade_in.menu.store.1"),
      2: t("trade_in.menu.store.2"),
      3: t("trade_in.menu.store.3"),
      4: t("trade_in.menu.store.4"),
      5: t("trade_in.menu.store.5"),
    },
  },
};

const isStore = computed(() => route.path.includes("store"));
const menu = computed(() => {
  const type = isStore.value ? "store" : "customer";
  const menu = wording[type].menu;
  return Object.entries(menu).map(([number, title]) => ({
    number: Number(number),
    title: title,
    to: {
      name: `trade-in-${type}-step-${number}`,
    },
  }));
});

const data = {
  sectionReassurance: {
    icons: [
      {
        text: "Livraison gratuite à partir de 100€ d'achat",
        alt: "Livraison gratuite",
        image: "https://demo.faume.co/cdn/shop/files/delivery-truck_100x100_crop_center.png?v=1691012825",
      },
      {
        text: "Retours gratuits sous 14 jours",
        alt: "Retours gratuits",
        image: "https://demo.faume.co/cdn/shop/files/keyboard_double_arrow_left_FILL0_wght400_GRAD0_opsz24.svg?v=1699347817",
      },
      {
        text: "Articles authentifiés et nettoyés",
        alt: "Article authentifiés",
        image: "https://demo.faume.co/cdn/shop/files/clean-clothes_100x100_crop_center.png?v=1691013900",
      },
      {
        text: "Paiement 100% sécurisé",
        alt: "Paiement sécurisé",
        image: "https://demo.faume.co/cdn/shop/files/verified_user_FILL0_wght400_GRAD0_opsz24.svg?v=1699347206",
      },
    ],
  },
};
</script>

<style lang="scss">
.ft-trade-in {
  padding-top: var(--f-length-4);
  padding-bottom: var(--f-length-4);
  //min-height: calc(100vh - var(--f-header-height) - var(--f-announcement-bar-height) - var(--f-top-bar-height));
  align-items: flex-start;
  flex-grow: 1;

  .f-loader {
    margin-right: auto;
    margin-left: auto;
    display: block;
  }
}

.f-ti-reassurance {
  margin-top: var(--f-margin-section);
}
</style>
