export function useProductFilters() {
  const listProducts = ref([]);
  const newActiveFilters = ref({});
  const currentSortOption = ref({});

  // Mappage des options de tri pour traduire des labels en paramètres API
  const sortMap = {
    "Prix croissant": { field: "price", order: "asc" },
    "Prix décroissant": { field: "price", order: "desc" },
    Nouveautés: { field: "createdAt", order: "desc" },
    Popularité: { field: "popularity", order: "desc" },
  };

  const { fetchProducts } = useProductsStore();

  const updateProductsList = async () => {
    listProducts.value = await fetchProducts(
      newActiveFilters.value,
      currentSortOption.value,
    );
  };

  const handleFilterChange = (filters) => {
    newActiveFilters.value = filters;
    updateProductsList();
  };

  const handleSortChange = (sortLabel) => {
    currentSortOption.value = sortMap[sortLabel];
    console.log("currentSortOption", currentSortOption.value);
    updateProductsList();
  };

  return {
    listProducts,
    newActiveFilters,
    currentSortOption,
    handleFilterChange,
    handleSortChange,
  };
}
