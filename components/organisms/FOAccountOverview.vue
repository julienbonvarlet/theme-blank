<template>
  <div class="account-overview">
    <img class="account-overview__background" :src="data.image" alt="Compte" />
    <div class="account-overview__blocks">
      <FMAccountOverviewBlock v-for="block in data.blocks" :key="block" v-bind="block" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { formatPriceWithoutCents } = usePriceFormatter();
const userStore = useUserStore();

const user = computed(() => userStore.user);
const walletAmount = computed(() => user.value?.walletAmount || 0);
const data = computed(() => ({
  image: "https://faume.imgix.net/18/home-baner.webp",
  blocks: [
    {
      text: t("account.overview.orders"),
      title: t("account.overview.track"),
      icon: "cart",
      to: "/account/orders",
      color: "light",
    },
    {
      type: "error",
      text: t("account.overview.credits"),
      title: formatPriceWithoutCents(walletAmount.value || 0),
      icon: "wallet",
      to: "/account/vouchers",
      color: "dark",
    },
  ],
}));
</script>

<style lang="scss">
.account-overview {
  min-height: calc(
    100vh - var(--f-header-height) - var(--f-top-bar-height) - var(--f-announcement-bar-height) - var(
        --f-margin-section
      ) - var(--f-margin-page)
  );
  position: relative;

  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-default);
    top: 0;
    left: 0;
    object-fit: cover;
  }

  &__blocks {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: var(--f-margin-page);
    display: flex;
    gap: var(--f-margin-page);
    z-index: var(--z-index-above);

    & > * {
      flex-grow: 1;
    }
  }
}
</style>
