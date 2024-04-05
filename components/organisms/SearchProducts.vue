<template>
  <div class="f-search-product">
    <div class="f-search-product__container">
      <div class="f-search-product__header">
        <FormKit
          v-model="searchQuery"
          type="text"
          :placeholder="$t('sections.search.placeholder')"
          class="search-input"
          suffix-icon="search"
          @input="searchProducts"
        />
        <FAButtonIcon
          class="close-button"
          :is-disabled="isFirstItemVisible"
          icon="cross"
          @click="closeSearch"
        />
      </div>
      <div class="f-search-product__content">
        <!-- Sidebar -->
        <aside class="f-search-sidebar">
          <div class="sidebar-section">
            <nav v-if="data.menu" class="f-header-submenu__menu">
              <FMNavigationList
                v-for="item in data.menu"
                :key="item.title"
                :title="item.title"
                :links="item.links"
                @list-click="closeSearch"
              />
            </nav>
          </div>
        </aside>
        <!-- Conteneur principal -->
        <div class="f-search-main">
          <!-- Afficher "Aucun produit trouvé" uniquement si une recherche a été effectuée sans résultat -->
          <div
            v-if="searchQuery && !searchResults.length"
            class="f-search-main__no-result"
          >
            <FAText size="s">{{ $t("sections.search.empty") }}</FAText>
          </div>
          <!-- Affiche les résultats de la recherche si présents -->
          <div v-if="searchResults.length" class="results-container">
            <FATitle size="xs">{{ $t("sections.search.results") }}</FATitle>
            <div class="results-container__content">
              <FMProductCard
                v-for="product in searchResults"
                :key="product.id"
                :product="product"
                @card-click="closeSearch"
              />
            </div>
            <div class="results-container__actions">
              <FAButton
                size="m"
                type="primary"
                :to="`/collections/id=?modele=${searchQuery}`"
                label="Voir tous les produits"
                @click="closeSearch"
              />
            </div>
          </div>
          <!-- Affiche les collections suggérées si aucun produit n'est recherché ou aucun produit trouvé -->
          <div v-else class="f-search-main__collection">
            <FATitle size="xs">{{ $t("sections.search.collections") }}</FATitle>
            <div class="f-search-main__collection-content">
              <FMCollectionCard
                v-for="(item, i) in suggestionMenuItems"
                :key="i"
                :collection="item"
                title-size="xs"
                class="f-collection-suggestion-menu__item"
                @collection-click="closeSearch"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "#imports";

const { fetchProducts, products } = useProductsStore();

const searchQuery = ref("");
const searchResults = ref([]);
const isVisible = ref(true);
const emit = defineEmits(["update:isSearchOpen"]);

const searchProducts = async () => {
  if (searchQuery.value.length > 1) {
    const results = await fetchProducts([searchQuery.value]);
    searchResults.value = results;
  } else if (searchQuery.value.length === 0) {
    searchResults.value = [];
  }
};

const closeSearch = () => {
  isVisible.value = false;
  emit("update:isSearchOpen", false);
};

const data = {
  menu: [
    {
      title: "Nos catégories",
      links: [
        { title: "Prêt à porter", url: "/collections/pret-a-porter" },
        { title: "Accessoires", url: "/collections/accessoires" },
        { title: "Robes", url: "/collections/robes" },
        { title: "Jupes et shorts", url: "/collections/jupes-shorts" },
        { title: "Tops & chemises", url: "/collections/chemise" },
        { title: "T-shirts", url: "/collections/t-shirt" },
        { title: "Mailles", url: "/collections/pulls-cardigans" },
        { title: "Denim & pantalons", url: "/collections/denim-pantalons" },
        { title: "Blousons & vestes", url: "/collections/blousons-vestes" },
        { title: "Manteaux", url: "/collections/manteaux" },
      ],
    },
  ],
};
const suggestionMenuItems = [
  {
    title: "Vestes",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Manteaux",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Robes",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Pantalons",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Jupes",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Pulls & Gilets",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Tops",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Accessoires",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
  {
    title: "Chaussures",
    photo: "https://faume.imgix.net/18/home-baner.webp",
    url: "/",
  },
];
</script>

<style lang="scss">
.f-search-product {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: var(--z-index-modal);
  background-color: #fff;
  padding-top: var(--header-height);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--f-length-2);

    .formkit-outer {
      margin: 0;
      flex: 1;
      margin-right: var(--f-length-2);

      .formkit-wrapper {
        max-width: 100%;
      }
    }
  }

  &__content {
    flex-grow: 1;
    display: flex;
    overflow: hidden;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: calc(100vh - 72px);
    z-index: 1050;
    background-color: #fff;
  }

  .f-search-sidebar {
    width: 300px;
    overflow-y: auto;
    padding: var(--f-length-2);

    .sidebar-section {
      margin-bottom: var(--f-length-2);

      h2 {
        margin-bottom: var(--f-length-1);
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: var(--f-length-0-5);
        }
      }
    }
  }

  .f-search-main {
    flex-grow: 1;
    overflow-y: auto;
    padding: var(--f-length-2);

    .results-container {
      width: 100%;
      max-width: 1200px;
      .f-title.is-xs {
        margin-bottom: var(--f-length-2);
      }

      &__content {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: var(--f-length-1);
        width: 100%;
      }
      &__actions {
        margin: var(--f-length-5) 0;
        display: flex;
        justify-content: center;
      }
    }
    &__collection {
      width: 100%;
      max-width: 1200px;
      .f-title.is-xs {
        margin-bottom: var(--f-length-2);
      }
    }
    &__collection-content {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: var(--f-length-1);
      width: 100%;
    }
    &__no-result {
      margin-bottom: var(--f-length-2);
      background-color: var(--f-color-background-light);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--f-length-2);
    }
  }
}
</style>
