export const usePreviousTitle = defineStore("previousTitle", () => {
  // States
  const previousTitle = ref(null);

  // Actions
  const getPreviousTitle = async (pageTitle: string) => {
    previousTitle.value = pageTitle;
  };

  return {
    previousTitle,
    getPreviousTitle,
  };
});
