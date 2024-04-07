export const usePreviousTitle = defineStore("previousTitle", () => {
  const previousTitle = ref<string | null>(null);

  const getPreviousTitle = async (pageTitle: string) => {
    previousTitle.value = pageTitle;
  };

  return {
    previousTitle,
    getPreviousTitle,
  };
});
