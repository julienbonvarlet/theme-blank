<template>
  <div class="product-listing content">
    <FOBanner
      :title="$t('pages.collection.all.title')"
      :text="$t('pages.collection.all.text')"
      :background-image="backgroundImage"
      title-size="l"
      size="m"
    />
    <FMSectionContainer :padding-x="true" max-width="xl" :padding-y="true">
      <FMBreadcrumb
        current-page-type="collection"
        :current-page-title="$t('pages.collection.all.title')"
      />
      <FOCollectionSuggestionMenu
        :suggestion-menu-items="suggestionMenuItems"
      />
    </FMSectionContainer>
    <FOFilterBar
      :filters-options="filters"
      :order-options="exempleDataOrder"
      :checkbox="true"
    />
    <FMSectionContainer :padding-x="true" max-width="xl" :padding-y="true">
      <div class="f-products-grid">
        <FMProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </FMSectionContainer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from "vue";
import { usePreviousTitle } from "#imports";
import { useCartStore } from "../../stores/cart";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
// const { products, filters } = await usePagesProducts();
const cartStore = useCartStore();
const { getPreviousTitle } = usePreviousTitle();

const backgroundImage =
  "https://www.thekooples.com/dw/image/v2/BGQL_PRD/on/demandware.static/-/Library-Sites-TKooplesSharedLibrary/default/dwf69f6d23/2024/SS24/Post%20Christmas/Homepage/desk/231221_FW23_POST_XMAS_HP_HEADER_DESK.jpg";

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
const exempleDataOrder = {
  filters: [
    {
      filterTitle: "",
      displayText: false,
      filterIcon: "grid-4",
      displayIcon: true,
      active: true,
    },
    {
      filterTitle: "",
      displayText: false,
      filterIcon: "grid-9",
      displayIcon: true,
      active: false,
    },
    {
      filterTitle: t("pages.collection.filters.labels.sort"),
      displayText: true,
      filterIcon: "down",
      displayIcon: true,
      active: false,
      filterListOptions: [
        { text: t("pages.collection.filters.orders.selection"), active: true },
        { text: t("pages.collection.filters.orders.new"), active: false },
        {
          text: t("pages.collection.filters.orders.low_to_high"),
          active: false,
        },
        {
          text: t("pages.collection.filters.orders.high_to_low"),
          active: false,
        },
      ],
    },
  ],
};

const handleAddToCart = (product) => {
  cartStore.addToCart(product);
  cartStore.toggleMiniCart();
};

onMounted(async () => {
  await nextTick();
  getPreviousTitle(title);
});
</script>

<style lang="scss">
.f-collection-header {
  margin-bottom: var(--f-length-4);
}

.f-products-grid {
  display: grid;
  grid-template-columns: var(--f-collection-nbr-items-row);
  gap: var(--f-length-2);

  &.is-big {
    grid-template-columns: var(--f-collection-nbr-items-row);
  }
}
</style>
