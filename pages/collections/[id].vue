<template>
  <div class="product-listing">
    <FOBanner
      :title="title"
      :text="text"
      :background-image="backgroundImage"
      size="s"
      title-size="l"
    />
    <FMBreadcrumb
      current-page-type="collection"
      :current-page-title="title"
      :padding-y="false"
    />

    <FMSectionContainer :padding-x="true" max-width="xl" :padding-y="false">
      <!-- <FMBreadcrumb currentPageType="collection" :currentPageTitle="title" /> -->
      <FOCollectionSuggestionMenu
        :suggestion-menu-items="suggestionMenuItems"
      />
    </FMSectionContainer>

    <FMSectionContainer
      ref="filterBar"
      max-width="xl"
      :padding-x="true"
      :padding-y="false"
      :class="['f-filter-bar', { 'is-sticky': isSticky }]"
      class-child="f-filter-bar__container"
    >
      <FOFilterBar
        :filters-options-active="newActiveFilters"
        :checkbox="true"
        :filters-options="filters"
        @filter-changed="handleFilterChange"
      />
      <FOFilterBar
        :filters-options-active="newActiveOrder"
        :checkbox="true"
        :filters-options="sortOptions"
        @filter-changed="handleOrderChange"
      />
    </FMSectionContainer>

    <FMSectionContainer
      :padding-x="true"
      max-width="xl"
      :padding-y="true"
      class="f-product-listing__content-grid"
    >
      <div class="f-products-grid">
        <FMProductCard
          v-for="product in listProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <FMPagination
        v-if="pagination && listProducts?.length"
        :first-page="firstPage"
        :previous-page="previousPage"
        :active-page="currentPage"
        :next-page="nextPage"
        :last-page="lastPage"
        @go="currentPageChange"
      />
    </FMSectionContainer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

// VARIABLES
const config = useRuntimeConfig();
const clientId = config.public.faume.clientId;
const { getPreviousTitle } = usePreviousTitle();
const { $API } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const listProducts = ref<any[] | null>(null);
const filters = ref<any[] | null>(null);
const newActiveFilters = ref<any[]>([]);
const newActiveOrder = ref<any[]>([]);
const pagination = ref<any | null>(null);
const currentPage = ref(1);
const firstPage = ref(1);
const previousPage = ref(1);
const nextPage = ref(1);
const lastPage = ref(1);
// VARIABLES

//FILTER BAR STICKY
const filterBar = ref();
const isSticky = ref(false);
const headerHeight = useHeaderHeight().headerHeight || 64;
const checkSticky = () => {
  const rect = unrefElement(filterBar).getBoundingClientRect();
  isSticky.value = rect && rect.top <= headerHeight;
};
onMounted(() => {
  window.addEventListener("scroll", checkSticky);
});
onUnmounted(() => {
  window.removeEventListener("scroll", checkSticky);
});
//FILTER BAR STICKY

// FETCH INITIAL DATA
// Sort
const sortOptions = {
  sort: [
    {
      key: "createdAt-asc",
      value: t("pages.collection.filters.orders.new"),
    },
    {
      key: "price-asc",
      value: t("pages.collection.filters.orders.low_to_high"),
    },
    {
      key: "price-desc",
      value: t("pages.collection.filters.orders.high_to_low"),
    },
  ],
};
// Sort

// Filter
const filterOrder = [
  "size_filters",
  "color_filters",
  "modele",
  "season",
  "state",
  "gender",
  "composition",
  "gender",
  "sort",
];
const initialFetch = await $API.article.apiCustomerArticlesGetCollection(1, 12);
const orderedFilters = {};
filterOrder.forEach((key) => {
  if (
    initialFetch["hydra:facets"] &&
    initialFetch["hydra:facets"][key] &&
    initialFetch["hydra:facets"][key].length > 1
  ) {
    orderedFilters[key] = initialFetch["hydra:facets"][key];
  }
});
filters.value = orderedFilters || [];
listProducts.value = initialFetch["hydra:member"] || [];
// Filter

// Pagination
pagination.value = initialFetch["hydra:view"] || {};
firstPage.value = pagination.value["hydra:first"]?.split("&page=")[1] || null;
previousPage.value =
  pagination.value["hydra:previous"]?.split("&page=")[1] || null;
currentPage.value = pagination.value["@id"]?.split("&page=")[1] || null;
nextPage.value = pagination.value["hydra:next"]?.split("&page=")[1] || null;
lastPage.value = pagination.value["hydra:last"]?.split("&page=")[1] || null;
const currentPageChange = (page) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  currentPage.value = page;
};
// Pagination
// FETCH INITIAL DATA

// FETCH DATA WITH FILTER OR SORT ACTIVE
// Filter
// Detect Filter Change
const handleOrderChange = (payload) => {
  newActiveOrder.value = payload;
};
// Detect Filter Change
// Formatters of filter args
const filterArgs = computed(() =>
  generateFilterArgs(newActiveFilters.value.concat(newActiveOrder.value)),
);
function generateFilterArgs(
  newActiveFilters: { type: string; value: string }[],
): string {
  const filters = {};

  newActiveFilters.forEach((filter) => {
    if (filters[filter.type]) {
      filters[filter.type].push(filter.value);
    } else {
      filters[filter.type] = [filter.value];
    }
  });

  let filterArgs = "";
  for (const type in filters) {
    const values = filters[type];
    if (values.length > 1) {
      filterArgs += values
        .map((value) => `&${type}[]=${encodeURIComponent(value)}`)
        .join("");
    } else {
      const value = values[0].split("-");
      if (value.length > 1) {
        filterArgs += `&${type}[${value[0]}]=${encodeURIComponent(value[1])}`;
      } else {
        filterArgs += `&${type}=${encodeURIComponent(values[0])}`;
      }
    }
  }
  return filterArgs;
}
// Formatters of filter args
// Launch the fetch when the filters change
watch(filterArgs, (value) => fetchProducts());
// Launch the fetch when the filters change
// Filter

// Sort
// Detect Order Change
const handleFilterChange = (payload) => {
  newActiveFilters.value = payload;
};
// Detect Order Change
// Launch the fetch when the order change
watch(currentPage, (value) => fetchProducts());
// Launch the fetch when the order change
// Sort

// Fetch products with active filters && sort
const fetchProducts = async (
  page = currentPage.value || 1,
  itemsPerPage = 12,
) => {
  const { data: products } = useAsyncData("filters", async () => {
    const response = await fetch(
      `https://api.faume.co/api/v3/customer/articles?page=${page}&itemsPerPage=${itemsPerPage}${filterArgs.value}`,
      {
        headers: {
          "X-Brand-Id": clientId,
        },
      },
    );
    const data = await response.json();
    products.value = data["hydra:member"];
    pagination.value = data["hydra:view"];
    if (products.value) {
      listProducts.value = products.value;
    }
    if (pagination.value) {
      firstPage.value =
        pagination.value["hydra:first"]?.split("&page=")[1] || null;
      previousPage.value =
        pagination.value["hydra:previous"]?.split("&page=")[1] || null;
      currentPage.value = pagination.value["@id"]?.split("&page=")[1] || null;
      nextPage.value =
        pagination.value["hydra:next"]?.split("&page=")[1] || null;
      lastPage.value =
        pagination.value["hydra:last"]?.split("&page=")[1] || null;
    }

    // Update available filters
    const filterTypes = newActiveFilters.value.map((filter) => filter.type);
    const potentialFilters = {};
    Object.keys(filters.value)
      .filter((key) => filterTypes.includes(key))
      .forEach((key) => {
        potentialFilters[key] = filters.value[key];
      });
    const newPotentialFilters = {};
    Object.keys(data["hydra:facets"])
      .filter((key) => !filterTypes.includes(key))
      .forEach((key) => {
        newPotentialFilters[key] = data["hydra:facets"][key];
      });

    const combinedFilters = { ...potentialFilters, ...newPotentialFilters };
    filterOrder.forEach((key) => {
      if (
        combinedFilters[key] &&
        key !== "composition" &&
        combinedFilters[key].length > 1
      ) {
        orderedFilters[key] = combinedFilters[key];
      }
    });
    filters.value = orderedFilters;
    // Update available filters

    // Put active filters, sort and order in the URL
    console.log(newActiveFilters);
    const [key, value] = filterArgs.value.split("&")[1].split("=");

    router.push({ query: { [key]: value } });
    // Put active filters, sort and order in the URL
  });
};
// Fetch products with active filters && sort
// FETCH DATA WITH FILTER OR SORT ACTIVE

// BREADCRUMB LOGIC //
onMounted(async () => {
  await nextTick();
  getPreviousTitle(title);
});
// BREADCRUMB LOGIC //

// CONTENT EXAMPLES DATA //
const title = "Tous nos produits";

const text =
  "Découvrez une gamme élégante de vêtements Faume pour femme, chacun soigneusement authentifié et préparé pour une seconde vie. Mélangez style sophistiqué et démarche écologique avec nos pièces de seconde main. L'excellence Faume à un prix éthique et abordable.";
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
// CONTENT EXAMPLES DATA //
</script>

<style lang="scss">
.f-product-listing {
  &__content-grid {
    .f-section-container__inner {
      padding-top: 0;
    }
  }
}
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

.f-filter-bar {
  position: sticky;
  top: var(--f-header-height);
  z-index: calc(var(--z-index-header) - 1);
  $self: &;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--f-length-4) 0;
    background-color: var(--f-filter-background-color);
    transition:
      background-color 0.3s ease-in-out,
      padding 0.3s ease-in-out;
  }

  &.is-sticky {
    #{$self}__container {
      background-color: var(--f-filter-background-color-sticky);
      padding: var(--f-length-1) var(--f-length-4);
    }
  }

  .f-filter-dropdown:last-child {
    .f-filter-list {
      right: 0;
    }
  }
}
</style>
