import { useFiltersStore, useAsyncData } from "#imports";

export const useFilters = async () => {
  const filtersStore = useFiltersStore();

  const { data: filters } = await useAsyncData("filters", () =>
    filtersStore.getFilters(),
  );

  return {
    filters,
  };
};
