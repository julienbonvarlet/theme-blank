export const useHeaderHeight = defineStore("headerHeight", () => {
  // States
  const headerHeight = ref(null);

  // Actions
  const setHeaderHeight = async (height: Number) => {
    headerHeight.value = height;
  };

  return {
    headerHeight,
    setHeaderHeight,
  };
});
