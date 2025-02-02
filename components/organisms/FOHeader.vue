<template>
  <header class="f-header">
    <FMSectionContainer :padding-x="true" max-width="xl" class-child="f-header__container">
      <div class="f-header__mobile">
        <button class="f-header__burger" @click.prevent="isMobileMenuOpen = true">
          <FAIcon :icon="IconNames.Menu" />
        </button>
      </div>

      <ul class="f-header__nav">
        <li v-for="link in menu" :key="link.label" class="f-header__link">
          <FAHeaderLink :to="link.to">{{ $t(link.label) }}</FAHeaderLink>
          <FMHeaderSubmenu v-if="link.columns || link.visuals" :label="link.label" :colums="link.columns" :visuals="link.visuals" />
        </li>
      </ul>

      <NuxtLink to="/" class="f-header__logo">
        <FALogo seo-title="Faume" />
      </NuxtLink>

      <div class="f-header__icons">
        <NuxtLink to="/account" class="f-header__account">
          <FAIcon :icon="IconNames.User" />
        </NuxtLink>
        <button class="f-header__search" @click="isSearchOpen = !isSearchOpen">
          <FAIcon :icon="IconNames.Search" />
        </button>
        <NuxtLink v-if="wishlistIcon" to="/whislist" class="f-header__whislist">
          <FAIcon :icon="IconNames.HeartEmpty" />
        </NuxtLink>
        <NuxtLink v-if="storeIcon" to="/store" class="f-header__store">
          <FAIcon :icon="IconNames.House" />
        </NuxtLink>
        <button class="f-header__cart" @click="toggleMiniCart">
          <FAIcon class="f-header__cart-icon" :icon="IconNames.Cart" />
          <span v-if="cartCount > 0" class="f-header__cart__count">{{ cartCount }}</span>
        </button>
      </div>
    </FMSectionContainer>
  </header>

  <!-- <FOMinicart />

  <FOSearchProducts v-if="isSearchOpen" @update:is-search-open="isSearchOpen = $event" />

  <FOMenu :open="isMobileMenuOpen" @on-close="isMobileMenuOpen = false" /> -->
</template>

<script setup lang="ts">
import faumeConfig from "~/faumeConfig";

import { IconNames } from "~/types/enums";

const menu = faumeConfig.menu;

const wishlistIcon = faumeConfig.header.wishlistIcon;
const storeIcon = faumeConfig.header.storeIcon;

const cartStore = useCartStore();
const { setHeaderHeight } = useHeaderHeight();
const header = ref(null);
const isSearchOpen = ref(false);
const isMobileMenuOpen = ref(false);

const toggleMiniCart = () => {
  cartStore.toggleMiniCart(true);
};

const cartCount = computed(() => cartStore.cartItems?.length);

onMounted(async () => {
  const headerHeight = header.value ? header.value.getBoundingClientRect().height : 0;
  setHeaderHeight(headerHeight);
});
</script>

<style lang="scss">
.f-header {
  align-items: center;
  background-color: var(--f-header-background);
  color: var(--f-header-color);
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  font-size: var(--f-header-link-font-size);
  $self: &;

  &__container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: var(--f-header-height);
  }

  &__nav {
    display: flex;
    gap: var(--f-header-links-gap);

    @include media("<desktop") {
      display: none;
    }

    & > * {
      display: flex;
      align-items: center;
    }
  }

  &__logo {
    justify-self: center;
    align-items: center;
    display: flex;
  }

  &__icons {
    justify-self: end;
    display: flex;
    align-items: center;
    justify-content: center;

    @include media(">tablet") {
      gap: var(--f-header-icons-gap);
    }
  }

  &__icons,
  &__mobile {
    & > button,
    & > a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 40px;
      height: 100%;
    }

    & > #{$self}__account {
      @include media("<tablet") {
        display: none !important;
      }
    }
  }

  &__cart {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    &__count {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background-color: var(--f-color-background-dark);
      color: var(--f-color-text-light);
      font-size: 10px;
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-10px);
    }
  }

  &__mobile {
    @include media(">=desktop") {
      display: none;
    }
  }

  &__burger,
  &__search {
    border: 0;
    background: transparent;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
  }

  .f-icon {
    font-size: var(--f-header-icons-size);
  }

  &__link {
    &:not(:hover) {
      .f-header-submenu {
        display: none;
      }
    }

    &:hover > a {
      text-decoration: underline;
    }
  }

  .f-header-submenu {
    position: absolute;
    left: 0;
    width: 100%;
    top: 100%;
  }
}
</style>
