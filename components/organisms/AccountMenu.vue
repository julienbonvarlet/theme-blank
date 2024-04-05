<template>
  <div class="f-account-menu">
    <ul>
      <li v-for="link in data.links" :key="link">
        <FAAccountLink v-bind="link" />
      </li>
    </ul>
    <FALink size="s" @click="logout">{{ data.logout }}</FALink>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore, computed } from "#imports";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const data = computed(() => ({
  links: [
    { title: t("account.menu.overview"), url: "/account", icon: "eye-opened" },
    {
      title: t("account.menu.informations"),
      url: "/account/informations",
      icon: "user",
    },
    {
      title: t("account.menu.addresses"),
      url: "/account/addresses",
      icon: "house",
    },
    { title: t("account.menu.orders"), url: "/account/orders", icon: "cart" },
    {
      title: t("account.menu.trade_ins"),
      url: "/account/resales",
      icon: "shirt",
    },
    {
      title: t("account.menu.gift_cards"),
      url: "/account/vouchers",
      icon: "voucher",
    },
  ],
  logout: t("account.menu.logout"),
}));

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<style lang="scss">
.f-account-menu {
  & > ul {
    margin-bottom: var(--account-menu-gap);

    & > li:not(:last-of-type) {
      border-bottom: var(--account-menu-border);
    }
  }
}
</style>
